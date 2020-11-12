const languages = require('iso-639-1');
const countries = require('country-list');

const getCustomResponseWithUrl = url => ({
    status: '302',
    statusDescription: 'Found',
    headers: {
        location: [{
            key: 'Location',
            value: url,
        }],
    },
});

exports.handler = (event, context, callback) => {
    try {
        const request = event.Records[0].cf.request;
        const headers = request.headers;

        console.log('request', request);
        console.log("headers['cloudfront-viewer-country']", headers['cloudfront-viewer-country']);
        console.log("headers['accept-language']", headers['accept-language']);

        if (headers['cloudfront-viewer-country'] &&
            headers['cloudfront-viewer-country'][0] &&
            headers['cloudfront-viewer-country'][0].value &&
            headers['accept-language'] &&
            headers['accept-language'][0] &&
            headers['accept-language'][0].value
        ) {
            const uri = request.uri;
            const countryCode = headers['cloudfront-viewer-country'][0].value.toLowerCase();
            const acceptLanguage = headers['accept-language'][0].value.toLowerCase();
            const languageCode = acceptLanguage.length > 2 ? acceptLanguage.substring(0, 1) : acceptLanguage;

            if (languages.validate(languageCode) && countries.getName(countryCode)) {
                const languageRegion = `${languageCode}-${countryCode}`;

                console.log('languageRegion', languageRegion);
            }


            // if (countryCode === 'TW') {
            //     url = 'https://tw.example.com/';
            // } else if (countryCode === 'US') {
            //     url = 'https://us.example.com/';
            // }

            //return response;
            callback(null, request);

        } else {
            callback(null, request);
        }

    } catch (err) {
        console.error(err);
        return new Error(err);
    }
};