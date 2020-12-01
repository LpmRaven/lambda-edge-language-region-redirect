const languages = require('iso-639-1');
const countries = require('country-list');
const { languageConfig, languageFallback, domainDefaultLanguage } = require('./language-config');
const { countryConfig, countryFallback, domainDefaultCountry } = require('./country-config');
const { checkRequiredConfig } = require('./check-required-config');
const { ignorePaths } = require('./ignore-paths')
const { getCustomResponseWithUrl } = require('./helpers/get-custom-response-with-url');
const { getLanguageRegionPath } = require('./helpers/get-language-region-path');
const { getLanguageRegion } = require('./helpers/get-language-region');

exports.handler = async (event) => {
    const request = event.Records[0].cf.request;

    try {
        if (checkRequiredConfig({ languageFallback, countryFallback, domainDefaultLanguage, domainDefaultCountry })) { // country-config.js and language-config.js must be modified for your preferences

            const headers = request.headers;
            const uri = request.uri;
            const languageFallbackString = languageFallback.toLowerCase();
            const countryFallbackString = countryFallback.toLowerCase();
            const domainDefaultLanguageString = domainDefaultLanguage.toLowerCase();
            const domainDefaultCountryString = domainDefaultCountry.toLowerCase();

            // Paths to ignore such as data and images
            if (!uri || ignorePaths.some(path => uri.includes(path))) {
                return request;
            }

            if (
                headers &&
                headers.cookie &&
                headers.cookie['language-region-override']
            ) {
                console.log("headers.cookie['language-region-override']", headers.cookie['language-region-override'])

                const cookieCountryCode = headers.cookie['language-region-override'].substring(3, 5).toLowerCase();
                const cookieLanguageCode = headers.cookie['language-region-override'].substring(0, 2).toLowerCase();
                const languageRegion = getLanguageRegion(languageConfig, countryConfig, cookieLanguageCode, cookieCountryCode, languageFallbackString, countryFallbackString);

                console.log('languageRegion in language-region-override', languageRegion);
                const modifiedUri = getLanguageRegionPath(domainDefaultLanguageString, domainDefaultCountryString, languageRegion, uri);
                const modifiedRequest = getCustomResponseWithUrl(modifiedUri);
                return modifiedRequest;

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
                const languageRegion = getLanguageRegion(languageConfig, countryConfig, headerLanguageCode, headerCountryCode, languageFallbackString, countryFallbackString)

                console.log('languageRegion in cloudfront-viewer-country/accept-language', languageRegion);
                const modifiedUri = getLanguageRegionPath(domainDefaultLanguageString, domainDefaultCountryString, languageRegion, uri);
                console.log('modifiedUri', modifiedUri);
                const modifiedRequest = getCustomResponseWithUrl(modifiedUri);
                console.log('modifiedRequest', modifiedRequest);

                return modifiedRequest;

            } else {
                const languageRegion = getLanguageRegion(languageConfig, countryConfig, languageFallbackString, countryFallbackString, languageFallbackString, countryFallbackString)

                console.log('languageRegion in fallback', languageRegion);
                const modifiedUri = getLanguageRegionPath(domainDefaultLanguageString, domainDefaultCountryString, languageRegion, uri);
                const modifiedRequest = getCustomResponseWithUrl(modifiedUri);
                return modifiedRequest;
            }
        }

    } catch (err) {
        console.error(err);
        return request;
    }
};