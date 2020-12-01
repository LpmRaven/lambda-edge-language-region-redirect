const validateLanguageRegionCode = require('./validate-language-region-code');

const replaceFirstPath = (uri, languageRegion) => {
    let splitPath = uri.split('/');
    //console.log('splitPath', splitPath);

    const checkedPaths = splitPath.filter(e => !validateLanguageRegionCode(e));
    //console.log('checkedPaths', checkedPaths);
    checkedPaths.unshift(languageRegion)

    //console.log('checkedPaths with unshift', checkedPaths);

    const newPath = checkedPaths.map(e => e).join('/');

    //console.log('newPath', newPath);

    return newPath;
}

module.exports = {
    replaceFirstPath
}