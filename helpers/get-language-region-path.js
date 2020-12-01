const getLanguageRegionPath = (domainDefaultLanguage, domainDefaultCountry, languageRegion, path) => {

    console.log('domainDefaultLanguage', domainDefaultLanguage);
    console.log('domainDefaultCountry', domainDefaultCountry);
    console.log('languageRegion', languageRegion);
    console.log('path', path);

    const domainDefaultLanguageRegion = `${domainDefaultLanguage.toLowerCase()}-${domainDefaultCountry.toLowerCase()}`;
    if (path === '/') return languageRegion === domainDefaultLanguageRegion ? path : `/${languageRegion}`;
    return languageRegion === domainDefaultLanguageRegion ? path : `/${replaceFirstPath(path, languageRegion)}`;
}

module.exports = {
    getLanguageRegionPath
}