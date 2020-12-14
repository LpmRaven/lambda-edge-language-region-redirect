const { getCustomResponseWithUrl } = require('../get-custom-response-with-url');

describe('get-custom-response-with-url', () => {

    beforeEach(() => {
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('will return custom response with new Location value', async () => {
        const url = "/en-gb/test-url";

        const result = await getCustomResponseWithUrl(url);
        expect(result).toEqual({ "headers": { "cache-control": [{ "key": "Cache-Control", "value": "max-age=3600" }], "location": [{ "key": "Location", "value": "/en-gb/test-url/index.html" }] }, "status": "302", "statusDescription": "Found" });
    });

    test('will return custom response with new Location value for root', async () => {
        const url = "/index.html";

        const result = await getCustomResponseWithUrl(url);
        expect(result).toEqual({ "headers": { "cache-control": [{ "key": "Cache-Control", "value": "max-age=3600" }], "location": [{ "key": "Location", "value": "/index.html" }] }, "status": "302", "statusDescription": "Found" });
    });

    test('will return custom response with new Location value for dir with index', async () => {
        const url = "/en-gb/index.html";

        const result = await getCustomResponseWithUrl(url);
        expect(result).toEqual({ "headers": { "cache-control": [{ "key": "Cache-Control", "value": "max-age=3600" }], "location": [{ "key": "Location", "value": "/en-gb/index.html" }] }, "status": "302", "statusDescription": "Found" });
    });
})
