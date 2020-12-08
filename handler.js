const { ignorePaths } = require('./ignore-paths')
const { changeLanguageRegion } = require('./helpers/change-language-region');
const { getCookie } = require('./helpers/get-cookie');

exports.handler = async (event) => {
    const request = event.Records[0].cf.request;

    try {
        const headers = request.headers;
        const uri = request.uri;

        // Paths to ignore such as data and images
        if (!uri || ignorePaths.some(path => uri.includes(path))) {
            return request;
        }

        if (
            headers &&
            headers.cookie &&
            headers.cookie['language-region-override']
        ) {
            console.log('cookie');

            const cookie = getCookie(headers, 'language-region-override')
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
            console.log('headers');

            const headerCountryCode = headers['cloudfront-viewer-country'][0].value.toLowerCase();
            const acceptLanguage = headers['accept-language'][0].value.toLowerCase();
            const headerLanguageCode = acceptLanguage.length > 2 ? acceptLanguage.substring(0, 2) : acceptLanguage;

            return changeLanguageRegion(uri, headerLanguageCode, headerCountryCode)

        } else {
            console.log('fallback');

            return changeLanguageRegion(uri);
        }

    } catch (err) {
        console.log('error');

        console.error(err);
        return request;
    }
};