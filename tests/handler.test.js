const { handler } = require('../handler');
const { changeLanguageRegion } = require('../helpers/change-language-region');

const { getCustomResponseWithUrl } = require('../helpers/get-custom-response-with-url');
let { mockOriginRequestEvent } = require('./mock-origin-request-event');

jest.mock('../helpers/change-language-region', () => ({
    changeLanguageRegion: jest.fn()
}));

describe('handler - will return origional request for missing URIs and ignore-paths', () => {

    beforeEach(() => {
        changeLanguageRegion.mockImplementationOnce(() => 'changeLanguageRegionMock')
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('will not ignore valid uri', async () => {
        let mockEvent = mockOriginRequestEvent;
        const validUri = "/here-is-a-valid-uri";
        mockEvent.Records[0].cf.request.uri = validUri;

        await handler(mockEvent);
        await expect(changeLanguageRegion).toHaveBeenCalledWith(validUri);
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

    //     await expect(handler(mockEvent)).resolves.toEqual(getCustomResponseWithUrl("/en-gb/here-is-a-valid-uri"));
    // });
});

describe('handler - headers["accept-language"][0].value and headers["cloudfront-viewer-country"][0].value', () => {

    beforeEach(() => {
        changeLanguageRegion.mockImplementationOnce(() => 'changeLanguageRegionMock')
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
        await expect(changeLanguageRegion).toHaveBeenCalledWith('/default-uri');
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
        await expect(changeLanguageRegion).toHaveBeenCalledWith('/default-uri');
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
        await expect(changeLanguageRegion).toHaveBeenCalledWith('/default-uri');
    });
});