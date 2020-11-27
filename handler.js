const languages = require('iso-639-1');
const countries = require('country-list');
const { languageConfig, languageFallback } = require('./language-config');
const { countryConfig, countryFallback } = require('./country-config');
const { checkRequiredConfig } = require('./check-required-config');

const getCustomResponseWithUrl = url => ({
    status: '302',
    statusDescription: 'Found',
    headers: {
        location: [{
            key: 'Location',
            value: url,
        }],
    },
});

const getLanguageRegion = (tempLanguageCode, tempCountryCode, languageFallback, countryFallback) => {
    if (languages.validate(tempLanguageCode)) { // Check valid codes
        if (countries.getName(tempCountryCode)) {
            const languageCode = languageConfig[tempLanguageCode] === true ? tempLanguageCode : languageFallback;  // Check language is enabled in config
            const countryCode = countryConfig[tempCountryCode] === true ? tempCountryCode : countryFallback; // Check country is enabled in config

            const languageRegion = `${languageCode}-${countryCode}`;

            console.log('languageRegion', languageRegion);


        } else {
            throw new Error(`Country Code '${tempCountryCode}' is invalid`);
        }
    } else {
        throw new Error(`Language Code '${tempLanguageCode}' is invalid`);
    }
}

exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;

    try {
        if (checkRequiredConfig({ languageFallback, countryFallback })) { // country-config.js and language-config.js must be modified for your preferences

            const headers = request.headers;
            const uri = request.uri;

            if (
                headers &&
                headers.cookie &&
                headers.cookie['language-region-override']
            ) {
                console.log("headers.cookie['language-region-override']", headers.cookie['language-region-override'])

                const cookieCountryCode = headers.cookie['language-region-override'].substring(3, 5).toLowerCase();
                const cookieLanguageCode = headers.cookie['language-region-override'].substring(0, 2).toLowerCase();
                const languageRegion = getLanguageRegion(cookieLanguageCode, cookieCountryCode, languageFallback, countryFallback)

                console.log('languageRegion', languageRegion);
                callback(null, request);

            } else if (
                headers &&
                headers['cloudfront-viewer-country'] &&
                headers['cloudfront-viewer-country'][0] &&
                headers['cloudfront-viewer-country'][0].value &&
                headers['accept-language'] &&
                headers['accept-language'][0] &&
                headers['accept-language'][0].value
            ) {
                console.log("headers['cloudfront-viewer-country']", headers['cloudfront-viewer-country']);
                console.log("headers['accept-language']", headers['accept-language']);

                const headerCountryCode = headers['cloudfront-viewer-country'][0].value.toLowerCase();
                const acceptLanguage = headers['accept-language'][0].value.toLowerCase();
                const headerLanguageCode = acceptLanguage.length > 2 ? acceptLanguage.substring(0, 2) : acceptLanguage;
                const languageRegion = getLanguageRegion(headerLanguageCode, headerCountryCode, languageFallback, countryFallback)

                console.log('languageRegion', languageRegion);
                callback(null, request);

            } else {
                const languageRegion = getLanguageRegion(languageFallback, countryFallback, languageFallback, countryFallback)

                console.log('languageRegion', languageRegion);
                callback(null, request);

            }
        }

    } catch (err) {
        console.error(err);
        callback(null, request);
    }
};