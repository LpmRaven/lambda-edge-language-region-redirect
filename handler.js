const path = require('path');
const { ignorePaths } = require('./ignore-paths')
const { changeLanguageRegion } = require('./helpers/change-language-region');
const Cookies = require('universal-cookie');


exports.handler = async (event) => {
    const request = event.Records[0].cf.request;

    try {
        const headers = request.headers;
        const uri = request.uri;
        const parsedPath = path.parse(request.uri);

        console.log('uri', uri);
        console.log('parsedPath', parsedPath);


        // Paths to ignore such as data and images
        if (
            !uri ||
            !parsedPath ||
            parsedPath.ext !== '' && uri !== '/index.html' ||
            ignorePaths.some(path => uri.includes(path))
        ) {
            return request;
        }

        console.log('headers.cookie');

        let cookie;
        if (headers.cookie) {
            const cookies = new Cookies(headers.cookie);
            cookie = cookies.get('language-region-override');
        }
        console.log('cookie outside', cookie);

        if (
            cookie
        ) {
            console.log('cookie', cookie);
            const cookieCountryCode = cookie.substring(3, 5).toLowerCase();
            const cookieLanguageCode = cookie.substring(0, 2).toLowerCase();

            return changeLanguageRegion(uri, cookieLanguageCode, cookieCountryCode)

        } else if (
            headers &&
            headers['cloudfront-viewer-country'] &&
            headers['cloudfront-viewer-country'][0] &&
            headers['cloudfront-viewer-country'][0].value &&
            headers['accept-language'] &&
            headers['accept-language'][0] &&
            headers['accept-language'][0].value
        ) {
            const headerCountryCode = headers['cloudfront-viewer-country'][0].value.toLowerCase();
            const acceptLanguage = headers['accept-language'][0].value.toLowerCase();
            const headerLanguageCode = acceptLanguage.length > 2 ? acceptLanguage.substring(0, 2) : acceptLanguage;

            const languageRegion = changeLanguageRegion(uri, headerLanguageCode, headerCountryCode)

            console.log('uri', uri);
            console.log('languageRegion', languageRegion);
            console.log(`headers['cloudfront-viewer-country'][0].value`, headers['cloudfront-viewer-country'][0].value);
            console.log(`headers['accept-language'][0].value`, headers['accept-language'][0].value);

            return languageRegion;
        } else {
            const languageRegion = changeLanguageRegion(uri);

            console.log('uri', uri);
            console.log('languageRegion', languageRegion);

            return languageRegion;
        }

    } catch (err) {
        console.error(err);
        return request;
    }
};