const languages = require('iso-639-1');
const countries = require('country-list');

const getLanguageRegion = (languageConfig, countryConfig, tempLanguageCode, tempCountryCode, languageFallback, countryFallback) => {
    if (languages.validate(tempLanguageCode)) { // Check valid codes
        if (countries.getName(tempCountryCode)) {
            const languageCode = languageConfig.some(language => language.code.toLowerCase() === tempLanguageCode && language.enabled === true) ? tempLanguageCode : languageFallback;  // Check language is enabled in config
            const countryCode = countryConfig.some(country => country.code.toLowerCase() === tempCountryCode && country.enabled === true) ? tempCountryCode : countryFallback; // Check country is enabled in config

            const languageRegion = `${languageCode}-${countryCode}`;

            //console.log('languageRegion in getLanguageRegion', languageRegion);

            return languageRegion;

        } else {
            throw new Error(`Country Code '${tempCountryCode}' is invalid`);
        }
    } else {
        throw new Error(`Language Code '${tempLanguageCode}' is invalid`);
    }
}

module.exports = {
    getLanguageRegion
}