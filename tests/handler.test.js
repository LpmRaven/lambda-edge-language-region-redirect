const { handler } = require('../handler');
const { changeLanguageRegion } = require('../helpers/change-language-region');

let { mockOriginRequestEvent } = require('./mock-origin-request-event');

jest.mock('../helpers/change-language-region', () => ({
    changeLanguageRegion: jest.fn()
}));

describe('handler - headers.cookie["language-region-override"]', () => {

    beforeEach(() => {
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    // test('', async () => {
    //     let mockEvent = mockOriginRequestEvent;
    //     mockEvent.Records[0].cf.request.uri = "/here-is-a-valid-uri";
    // mockEvent.Records[0].cf.request.headers = {
    //     ...mockEvent.Records[0].cf.request.headers,
    //     'cookie': [
    //         {
    //             "key": "language-region-override",
    //             "value": "EN-GB"
    //         }
    //     ]
    // };

    //     const result = await handler(mockEvent);
    //expect(result).toEqual(getCustomResponseWithUrl("/en-gb/here-is-a-valid-uri"));
    // });
});

describe('handler - headers["accept-language"][0].value and headers["cloudfront-viewer-country"][0].value', () => {

    beforeEach(() => {
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('will call changeLanguageRegion with just uri if headers["accept-language"][0].value and headers["cloudfront-viewer-country"][0].value are undefined', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.headers = {
            ...mockEvent.Records[0].cf.request.headers,
            'cloudfront-viewer-country': [
                {
                    "key": "Cloudfront-Viewer-Country",
                    "value": undefined
                }
            ],
            'accept-language': [
                {
                    "key": "Accept-Language",
                    "value": undefined
                }
            ]
        };

        await handler(mockEvent);
        expect(changeLanguageRegion).toHaveBeenCalledWith('/default-uri');
    });

    test('will call changeLanguageRegion with just uri if headers["accept-language"][0].value is undefined', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.headers = {
            ...mockEvent.Records[0].cf.request.headers,
            'cloudfront-viewer-country': [
                {
                    "key": "Cloudfront-Viewer-Country",
                    "value": "GB"
                }
            ],
            'accept-language': [
                {
                    "key": "Accept-Language",
                    "value": undefined
                }
            ]
        };

        await handler(mockEvent);
        expect(changeLanguageRegion).toHaveBeenCalledWith('/default-uri');
    });

    test('will call changeLanguageRegion with just uri if headers["cloudfront-viewer-country"][0].value is undefined', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.headers = {
            ...mockEvent.Records[0].cf.request.headers,
            'cloudfront-viewer-country': [
                {
                    "key": "Cloudfront-Viewer-Country",
                    "value": undefined
                }
            ],
            'accept-language': [
                {
                    "key": "Accept-Language",
                    "value": "EN"
                }
            ]
        };

        await handler(mockEvent);
        expect(changeLanguageRegion).toHaveBeenCalledWith('/default-uri');
    });
});

describe('handler - will return origional request for missing URIs and ignore-paths', () => {

    beforeEach(() => {
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('will not ignore valid uri', async () => {
        let mockEvent = mockOriginRequestEvent;
        const validUri = "/here-is-a-valid-uri";
        mockEvent.Records[0].cf.request.uri = validUri;

        await handler(mockEvent);
        expect(changeLanguageRegion).toHaveBeenCalledWith(validUri);
    });

    test('will return origional request for undefined uri', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing "page-data"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/page-data";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for and extended uri containing "page-data"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/here-is-a-url/with/page-data/in-the-middle";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".json"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-file.json";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".xml"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-file.xml";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".css"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-file.css";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".js"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-file.js";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".jpg"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-image-file.jpg";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".jpeg"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-image-file.jpg";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".svg"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-image-file.svg";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".png"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-image-file.png";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".webp"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-image-file.webp";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".jfif"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-image-file.jfif";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".pjpeg"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-image-file.pjpeg";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".pjp"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-image-file.pjp";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".gif"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-image-file.gif";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".avif"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-image-file.avif";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".apng"', async () => {
        let mockEvent = mockOriginRequestEvent;
        mockEvent.Records[0].cf.request.uri = "/my-image-file.apng";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });
});
