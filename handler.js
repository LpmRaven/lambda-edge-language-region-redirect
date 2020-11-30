const languages = require('iso-639-1');
const countries = require('country-list');
const { languageConfig, languageFallback, domainDefaultLanguage } = require('./language-config');
const { countryConfig, countryFallback, domainDefaultCountry } = require('./country-config');
const { checkRequiredConfig } = require('./check-required-config');
const { ignorePaths } = require('./ignore-paths')

const validateLanguageRegionCode = languageRegion => {
    if (languageRegion.length !== 5) return false;

    const languageCode = languageRegion.substring(0, 2).toLowerCase();
    const countryCode = languageRegion.substring(3, 5).toLowerCase();

    return languages.validate(languageCode) && countries.getName(countryCode) ? true : false;
}

const getCustomResponseWithUrl = url => ({
    status: '302',
    statusDescription: 'Found',
    headers: {
        location: [{
            key: 'Location',
            value: url,
        }],
        'cache-control': [{
            key: 'Cache-Control',
            value: "max-age=3600"
        }],
    },
});

const replaceFirstPath = (uri, languageRegion) => {
    let splitPath = uri.split('/');
    console.log('splitPath', splitPath);

    const checkedPaths = splitPath.filter(e => !validateLanguageRegionCode(e));
    console.log('checkedPaths', checkedPaths);
    checkedPaths.unshift(languageRegion)

    console.log('checkedPaths with unshift', checkedPaths);

    const newPath = checkedPaths.map(e => e).join('/');

    console.log('newPath', newPath);

    return newPath;

}

const getLanguageRegionPath = (domainDefaultLanguage, domainDefaultCountry, languageRegion, path) => {

    console.log('domainDefaultLanguage', domainDefaultLanguage);
    console.log('domainDefaultCountry', domainDefaultCountry);
    console.log('languageRegion', languageRegion);
    console.log('path', path);

    const domainDefaultLanguageRegion = `${domainDefaultLanguage.toLowerCase()}-${domainDefaultCountry.toLowerCase()}`;
    if (path === '/') return languageRegion === domainDefaultLanguageRegion ? path : `/${languageRegion}`;
    return languageRegion === domainDefaultLanguageRegion ? path : `/${replaceFirstPath(path, languageRegion)}`;
}

const getLanguageRegion = (tempLanguageCode, tempCountryCode, languageFallback, countryFallback) => {
    if (languages.validate(tempLanguageCode)) { // Check valid codes
        if (countries.getName(tempCountryCode)) {
            const languageCode = languageConfig.some(language => language.code.toLowerCase() === tempLanguageCode && language.enabled === true) ? tempLanguageCode : languageFallback;  // Check language is enabled in config
            const countryCode = countryConfig.some(country => country.code.toLowerCase() === tempCountryCode && country.enabled === true) ? tempCountryCode : countryFallback; // Check country is enabled in config

            const languageRegion = `${languageCode}-${countryCode}`;

            console.log('languageRegion in getLanguageRegion', languageRegion);

            return languageRegion;

        } else {
            throw new Error(`Country Code '${tempCountryCode}' is invalid`);
        }
    } else {
        throw new Error(`Language Code '${tempLanguageCode}' is invalid`);
    }
}

exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;

    try {
        if (checkRequiredConfig({ languageFallback, countryFallback, domainDefaultLanguage, domainDefaultCountry })) { // country-config.js and language-config.js must be modified for your preferences

            const headers = request.headers;
            const uri = request.uri;
            const languageFallbackString = languageFallback.toLowerCase();
            const countryFallbackString = countryFallback.toLowerCase();
            const domainDefaultLanguageString = domainDefaultLanguage.toLowerCase();
            const domainDefaultCountryString = domainDefaultCountry.toLowerCase();

            // Paths to ignore such as data and images
            if (!uri || ignorePaths.some(path => uri.includes(path))) {
                callback(null, request);
            }

            if (
                headers &&
                headers.cookie &&
                headers.cookie['language-region-override']
            ) {
                console.log("headers.cookie['language-region-override']", headers.cookie['language-region-override'])

                const cookieCountryCode = headers.cookie['language-region-override'].substring(3, 5).toLowerCase();
                const cookieLanguageCode = headers.cookie['language-region-override'].substring(0, 2).toLowerCase();
                const languageRegion = getLanguageRegion(cookieLanguageCode, cookieCountryCode, languageFallbackString, countryFallbackString);

                console.log('languageRegion in language-region-override', languageRegion);
                const modifiedUri = getLanguageRegionPath(domainDefaultLanguageString, domainDefaultCountryString, languageRegion, uri);
                const modifiedRequest = getCustomResponseWithUrl(modifiedUri);
                callback(null, modifiedRequest);

            } else if (
                headers &&
                headers['cloudfront-viewer-country'] &&
                headers['cloudfront-viewer-country'][0] &&
                headers['cloudfront-viewer-country'][0].value &&
                headers['accept-language'] &&
                headers['accept-language'][0] &&
                headers['accept-language'][0].value
            ) {
                console.log("headers['cloudfront-viewer-country']", headers['cloudfront-viewer-country']);
                console.log("headers['accept-language']", headers['accept-language']);

                const headerCountryCode = headers['cloudfront-viewer-country'][0].value.toLowerCase();
                const acceptLanguage = headers['accept-language'][0].value.toLowerCase();
                const headerLanguageCode = acceptLanguage.length > 2 ? acceptLanguage.substring(0, 2) : acceptLanguage;
                const languageRegion = getLanguageRegion(headerLanguageCode, headerCountryCode, languageFallbackString, countryFallbackString)

                console.log('languageRegion in cloudfront-viewer-country/accept-language', languageRegion);
                const modifiedUri = getLanguageRegionPath(domainDefaultLanguageString, domainDefaultCountryString, languageRegion, uri);
                console.log('modifiedUri', modifiedUri);
                const modifiedRequest = getCustomResponseWithUrl(modifiedUri);
                console.log('modifiedRequest', modifiedRequest);

                callback(null, modifiedRequest);

            } else {
                const languageRegion = getLanguageRegion(languageFallbackString, countryFallbackString, languageFallbackString, countryFallbackString)

                console.log('languageRegion in fallback', languageRegion);
                const modifiedUri = getLanguageRegionPath(domainDefaultLanguageString, domainDefaultCountryString, languageRegion, uri);
                const modifiedRequest = getCustomResponseWithUrl(modifiedUri);
                callback(null, modifiedRequest);
            }
        }

    } catch (err) {
        console.error(err);
        callback(null, request);
    }
};