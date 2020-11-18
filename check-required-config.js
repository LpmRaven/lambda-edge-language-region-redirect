const checkRequiredConfig = ({ languageFallback, countryFallback }) => {
    if (!countryFallback) {
        throw new Error("A required config variable <countryFallback> is not defined");
    }
    if (!languageFallback) {
        throw new Error("A required config variable <languageFallback> is not defined");
    }

    return true;
};

module.exports = { checkRequiredConfig };