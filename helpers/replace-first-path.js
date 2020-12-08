const { validateLanguageRegionCode } = require('./validate-language-region-code');

const replaceFirstPath = (path, languageRegion) => {
    const splitPath = path.split('/');
    const checkedPaths = splitPath.filter(e => !validateLanguageRegionCode(e));
    checkedPaths.unshift(languageRegion)
    const newPath = checkedPaths.filter(e => e).join('/');

    return `/${newPath}`;
}

module.exports = {
    replaceFirstPath
}