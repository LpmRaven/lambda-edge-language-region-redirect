const { handler } = require('../handler');
const { getCustomResponseWithUrl } = require('../helpers/get-custom-response-with-url');
let { mockOriginRequestEvent } = require('./mock-origin-request-event');

describe('handler - will return origional request for missing URIs and ignore-paths', () => {

    beforeEach(() => {
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('will not ignore valid uri', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/here-is-a-valid-uri";

        await expect(handler(mockEvent)).resolves.toEqual(getCustomResponseWithUrl("/here-is-a-valid-uri"));
    });

    test('will return origional request for undefined uri', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "";

        await expect(handler(mockEvent)).resolves.toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing "page-data"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/page-data";

        await expect(handler(mockEvent)).resolves.toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for and extended uri containing "page-data"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/here-is-a-url/with/page-data/in-the-middle";

        await expect(handler(mockEvent)).resolves.toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".json"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-file.json";

        await expect(handler(mockEvent)).resolves.toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".xml"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-file.xml";

        await expect(handler(mockEvent)).resolves.toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".css"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-file.css";

        await expect(handler(mockEvent)).resolves.toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".js"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-file.js";

        await expect(handler(mockEvent)).resolves.toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".jpg"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-image-file.jpg";

        await expect(handler(mockEvent)).resolves.toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".jpeg"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-image-file.jpg";

        await expect(handler(mockEvent)).resolves.toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".svg"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-image-file.svg";

        await expect(handler(mockEvent)).resolves.toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".png"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-image-file.png";

        await expect(handler(mockEvent)).resolves.toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".webp"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-image-file.webp";

        await expect(handler(mockEvent)).resolves.toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".jfif"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-image-file.jfif";

        await expect(handler(mockEvent)).resolves.toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".pjpeg"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-image-file.pjpeg";

        await expect(handler(mockEvent)).resolves.toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".pjp"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-image-file.pjp";

        await expect(handler(mockEvent)).resolves.toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".gif"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-image-file.gif";

        await expect(handler(mockEvent)).resolves.toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".avif"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-image-file.avif";

        await expect(handler(mockEvent)).resolves.toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".apng"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-image-file.apng";

        await expect(handler(mockEvent)).resolves.toEqual(mockEvent.Records[0].cf.request);
    });
});


describe('handler - headers.cookie["language-region-override"]', () => {

    beforeEach(() => {
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('', async () => {
        // let mockEvent = mockOriginRequestEvent;
        // mockEvent.Records[0].cf.request.uri = "/here-is-a-valid-uri";

        // await expect(handler(mockEvent)).resolves.toEqual(getCustomResponseWithUrl("/here-is-a-valid-uri"));
    });

});

describe('handler - headers["accept-language"][0].value and headers["cloudfront-viewer-country"][0].value', () => {

    beforeEach(() => {
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('', async () => {
        // let mockEvent = mockOriginRequestEvent;
        // mockEvent.Records[0].cf.request.uri = "/here-is-a-valid-uri";

        // await expect(handler(mockEvent)).resolves.toEqual(getCustomResponseWithUrl("/here-is-a-valid-uri"));
    });

});