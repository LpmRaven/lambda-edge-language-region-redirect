const { replaceFirstPath } = require('./replace-first-path');

const getLanguageRegionPath = (path, languageRegion, domainDefaultLanguageRegion) => {
    if (path === '/') return languageRegion === domainDefaultLanguageRegion ? path : `/${languageRegion}`;
    return languageRegion === domainDefaultLanguageRegion ? path : replaceFirstPath(path, languageRegion);
}

module.exports = {
    getLanguageRegionPath
}