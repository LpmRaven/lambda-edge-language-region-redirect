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

module.exports = {
    getCustomResponseWithUrl
}
