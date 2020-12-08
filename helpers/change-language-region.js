const { languageConfig, languageFallback, domainDefaultLanguage } = require('../language-config');
const { countryConfig, countryFallback, domainDefaultCountry } = require('../country-config');
const { checkRequiredConfig } = require('./check-required-config');
const { getCustomResponseWithUrl } = require('./get-custom-response-with-url');
const { getLanguageRegionPath } = require('./get-language-region-path');
const { getLanguageRegion } = require('./get-language-region');

const changeLanguageRegion = (uri, languageCode = languageFallback, countryCode = countryFallback) => {
    if (checkRequiredConfig({ languageFallback, countryFallback, domainDefaultLanguage, domainDefaultCountry })) { // country-config.js and language-config.js must be modified for your preferences

        const languageCodeString = languageCode.toLowerCase();
        const countryCodeString = countryCode.toLowerCase();
        const languageFallbackString = languageFallback.toLowerCase();
        const countryFallbackString = countryFallback.toLowerCase();
        const domainDefaultLanguageString = domainDefaultLanguage.toLowerCase();
        const domainDefaultCountryString = domainDefaultCountry.toLowerCase();

        const languageRegion = getLanguageRegion(languageConfig, countryConfig, languageCodeString, countryCodeString, languageFallbackString, countryFallbackString)
        const domainDefaultLanguageRegion = getLanguageRegion(languageConfig, countryConfig, domainDefaultLanguageString, domainDefaultCountryString, languageFallbackString, countryFallbackString)
        const modifiedUri = getLanguageRegionPath(domainDefaultLanguageRegion, languageRegion, uri);
        const modifiedRequest = getCustomResponseWithUrl(modifiedUri);

        return modifiedRequest;
    }
}

module.exports = {
    changeLanguageRegion
}
