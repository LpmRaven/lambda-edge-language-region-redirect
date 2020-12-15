const parseCookie = (headersCookie) => {
    const parsedCookie = {};
    if (headersCookie && headersCookie.length > 0) {
        headersCookie[0].value.split(';').forEach((cookie) => {
            if (cookie) {
                const parts = cookie.split('=');
                parsedCookie[parts[0].trim()] = parts[1].trim();
            }
        });
    }
    return parsedCookie;
}

module.exports = {
    parseCookie
}
