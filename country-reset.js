const fs = require('fs');
const COUNTRY_LIST = require('country-list/data.json');

const countryReset = () => {
    const countryData = COUNTRY_LIST.map(country => ({
        code: country.code,
        name: country.name,
        enabled: false
    }));

    const jsonData = JSON.stringify(countryData, null, 4);

    const countryFileContent = `
    const domainDefaultCountry = "US";
    const countryFallback = "US";
    const europeanUnionEnabled = false;
    const countryConfig = ${jsonData};
    module.exports = {countryConfig, countryFallback, domainDefaultCountry};
    `;

    fs.writeFile("country-config.js", countryFileContent, (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

module.exports = {
    countryReset
}