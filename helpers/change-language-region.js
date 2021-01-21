const { languageConfig, languageFallback, domainDefaultLanguage } = require('../language-config');
const { countryConfig, countryFallback, domainDefaultCountry } = require('../country-config');
const { checkRequiredConfig } = require('./check-required-config');
const { getCustomResponseWithUrl } = require('./get-custom-response-with-url');
const { getLanguageRegionPath } = require('./get-language-region-path');
const { getLanguageRegion } = require('./get-language-region');

const changeLanguageRegion = (request, uri, languageCode = languageFallback, countryCode = countryFallback) => {
    if (checkRequiredConfig({ languageFallback, countryFallback, domainDefaultLanguage, domainDefaultCountry })) { // country-config.js and language-config.js must be modified for your preferences
        const languageCodeString = languageCode.toString().toLowerCase();
        const countryCodeString = countryCode.toString().toLowerCase();
        const languageFallbackString = languageFallback.toString().toLowerCase();
        const countryFallbackString = countryFallback.toString().toLowerCase();
        const domainDefaultLanguageString = domainDefaultLanguage.toString().toLowerCase();
        const domainDefaultCountryString = domainDefaultCountry.toString().toLowerCase();

        const languageRegion = getLanguageRegion(languageConfig, countryConfig, languageCodeString, countryCodeString, languageFallbackString, countryFallbackString)
        const domainDefaultLanguageRegion = getLanguageRegion(languageConfig, countryConfig, domainDefaultLanguageString, domainDefaultCountryString, languageFallbackString, countryFallbackString)
        const modifiedUri = getLanguageRegionPath(uri, languageRegion, domainDefaultLanguageRegion);
        const modifiedRequest = getCustomResponseWithUrl(request, modifiedUri);

        return modifiedRequest;
    }
}

module.exports = {
    changeLanguageRegion
}
