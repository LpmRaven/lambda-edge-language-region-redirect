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

exports.handler = async (event) => {
    try {
        const request = event.Records[0].cf.request;
        const headers = request.headers;

        console.log("headers['cloudfront-viewer-country']", headers['cloudfront-viewer-country']);
        console.log("headers['Accept-Language']", headers['Accept-Language']);

        if (headers['cloudfront-viewer-country'] && headers['cloudfront-viewer-country'][0] && headers['cloudfront-viewer-country'][0].value && headers['Accept-Language']) {
            const uri = request.uri;
            const countryCode = headers['cloudfront-viewer-country'][0].value;
            const languageCode = headers['Accept-Language'][0].value




            // if (countryCode === 'TW') {
            //     url = 'https://tw.example.com/';
            // } else if (countryCode === 'US') {
            //     url = 'https://us.example.com/';
            // }

            //return response;
            return request;

        } else {
            return request;
        }

    } catch (err) {
        console.error(err);
        return new Error(err);
    }
};