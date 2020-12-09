const { getCustomResponseWithUrl } = require('../get-custom-response-with-url');

describe('get-custom-response-with-url', () => {

    beforeEach(() => {
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('will return ccustom response with new Location value', async () => {
        const url = "/en-gb/test-url";

        const result = await getCustomResponseWithUrl(url);
        expect(result).toEqual({ "headers": { "cache-control": [{ "key": "Cache-Control", "value": "max-age=3600" }], "location": [{ "key": "Location", "value": "/en-gb/test-url" }] }, "status": "302", "statusDescription": "Found" });
    });
})
