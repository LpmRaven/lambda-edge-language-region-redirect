const checkRequiredConfig = ({ languageFallback, countryFallback, domainDefaultLanguage, domainDefaultCountry }) => {
    if (!countryFallback) {
        throw new Error("A required config variable <countryFallback> is not defined");
    }
    if (!languageFallback) {
        throw new Error("A required config variable <languageFallback> is not defined");
    }
    if (!domainDefaultLanguage) {
        throw new Error("A required config variable <domainDefaultLanguage> is not defined");
    }
    if (!domainDefaultCountry) {
        throw new Error("A required config variable <domainDefaultCountry> is not defined");
    }

    return true;
};

module.exports = { checkRequiredConfig };