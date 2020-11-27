const fs = require('fs');
const LANGUAGES_LIST = require('./language-data.js').default;

const languageReset = () => {
    const languageData = Object.keys(LANGUAGES_LIST).map(key => ({
        code: key,
        name: LANGUAGES_LIST[key].name,
        nativeName: LANGUAGES_LIST[key].nativeName,
        enabled: false
    }));

    const jsonData = JSON.stringify(languageData, null, 4);

    const languageFileContent = `
    const languageFallback = "en";
    const languageConfig = ${jsonData};
    module.exports = {languageConfig, languageFallback};
    `;

    fs.writeFile("language-config.js", languageFileContent, (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

module.exports = {
    languageReset
}