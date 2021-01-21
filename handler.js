const path = require('path');
const { ignorePaths } = require('./ignore-paths')
const { changeLanguageRegion } = require('./helpers/change-language-region');
const { parseCookie } = require('./helpers/parse-cookie');

exports.handler = async (event) => {
    const request = event.Records[0].cf.request;

    try {
        const headers = request.headers;
        const uri = request.uri;
        const parsedPath = path.parse(request.uri);

        // Paths to ignore such as data and images
        if (
            !uri ||
            !parsedPath ||
            parsedPath.ext !== '' && uri !== '/index.html' ||
            ignorePaths.some(path => uri.includes(path))
        ) {
            return request;
        }

        let cookie;
        if (headers.cookie) {
            const parsedCookies = parseCookie(headers.cookie);
            cookie = parsedCookies ? parsedCookies['language-region-override'] : undefined;
        }

        if (
            cookie
        ) {
            const cookieCountryCode = cookie.substring(3, 5).toLowerCase();
            const cookieLanguageCode = cookie.substring(0, 2).toLowerCase();

            return changeLanguageRegion(request, uri, cookieLanguageCode, cookieCountryCode)

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
            const languageRegion = changeLanguageRegion(request, uri, headerLanguageCode, headerCountryCode)

            return languageRegion;
        } else {
            const languageRegion = changeLanguageRegion(request, uri);

            return languageRegion;
        }

    } catch (err) {
        console.error(err);
        return request;
    }
};