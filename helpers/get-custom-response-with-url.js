const path = require('path');

const getCustomResponseWithUrl = uri => {
    const parsedPath = path.parse(uri);
    const newUri = path.join(parsedPath.dir, parsedPath.base, 'index.html');

    return (
        {
            status: '302',
            statusDescription: 'Found',
            headers: {
                location: [{
                    key: 'Location',
                    value: newUri,
                }],
                'cache-control': [{
                    key: 'Cache-Control',
                    value: "max-age=3600"
                }],
            },
        }
    )
};

module.exports = {
    getCustomResponseWithUrl
}
