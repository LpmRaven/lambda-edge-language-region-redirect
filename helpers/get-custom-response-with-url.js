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
            uri: newUri
        }
    )
};

module.exports = {
    getCustomResponseWithUrl
}
