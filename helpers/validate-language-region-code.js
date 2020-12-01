const validateLanguageRegionCode = languageRegion => {
    if (languageRegion.length !== 5) return false;

    const languageCode = languageRegion.substring(0, 2).toLowerCase();
    const countryCode = languageRegion.substring(3, 5).toLowerCase();

    return languages.validate(languageCode) && countries.getName(countryCode) ? true : false;
}

module.exports = {
    validateLanguageRegionCode
}