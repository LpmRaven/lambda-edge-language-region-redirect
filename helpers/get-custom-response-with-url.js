const path = require('path');

const getCustomResponseWithUrl = (request, uri) => {
    const parsedPath = path.parse(uri);
    let newUri;
    if (parsedPath.base !== 'index.html') { // Allows you to specify index.html as default root object in CloudFront
        newUri = path.join(parsedPath.dir, parsedPath.base, 'index.html');
    } else {
        newUri = path.join(parsedPath.dir, parsedPath.base);
    }

    return (
        {
            ...request,
            status: '200',
            statusDescription: 'OK',
            headers: {
                ...request.headers,
                // location: [{
                //     key: 'Location',
                //     value: newUri,
                // }],
                'cache-control': [{
                    key: 'Cache-Control',
                    value: "max-age=3600"
                }],
            },
            //uri: newUri
            "origin": {
                "custom": {
                    ...request.origin.custom,
                    "path": newUri
                }
            },
        }
    )
};

module.exports = {
    getCustomResponseWithUrl
}
