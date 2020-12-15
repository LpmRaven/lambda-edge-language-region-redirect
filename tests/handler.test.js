const { handler } = require('../handler');
const { changeLanguageRegion } = require('../helpers/change-language-region');
const { parseCookie } = require('../helpers/parse-cookie');

jest.mock('../helpers/parse-cookie', () => ({
    parseCookie: jest.fn()
}));
jest.mock('../helpers/change-language-region', () => ({
    changeLanguageRegion: jest.fn()
}));

describe('error logging', () => {
    const OLD_CONSOLE = global.console;
    let mockOriginRequestEvent;

    beforeEach(() => {
        jest.resetModules();
        global.console = { ...OLD_CONSOLE }
        mockOriginRequestEvent = {
            "Records": [
                {
                    "cf": {
                        "config": {
                            "distributionDomainName": "d111111abcdef8.cloudfront.net",
                            "distributionId": "EDFDVBD6EXAMPLE",
                            "eventType": "origin-request",
                            "requestId": "4TyzHTaYWb1GX1qTfsHhEqV6HUDd_BzoBZnwfnvQc_1oF26ClkoUSEQ=="
                        },
                        "request": {
                            "clientIp": "203.0.113.178",
                            "headers": {
                                "x-forwarded-for": [
                                    {
                                        "key": "X-Forwarded-For",
                                        "value": "203.0.113.178"
                                    }
                                ],
                                "user-agent": [
                                    {
                                        "key": "User-Agent",
                                        "value": "Amazon CloudFront"
                                    }
                                ],
                                "via": [
                                    {
                                        "key": "Via",
                                        "value": "2.0 2afae0d44e2540f472c0635ab62c232b.cloudfront.net (CloudFront)"
                                    }
                                ],
                                "host": [
                                    {
                                        "key": "Host",
                                        "value": "example.org"
                                    }
                                ],
                                "cache-control": [
                                    {
                                        "key": "Cache-Control",
                                        "value": "no-cache, cf-no-cache"
                                    }
                                ]
                            },
                            "method": "GET",
                            "origin": {
                                "custom": {
                                    "customHeaders": {},
                                    "domainName": "example.org",
                                    "keepaliveTimeout": 5,
                                    "path": "",
                                    "port": 443,
                                    "protocol": "https",
                                    "readTimeout": 30,
                                    "sslProtocols": [
                                        "TLSv1",
                                        "TLSv1.1",
                                        "TLSv1.2"
                                    ]
                                }
                            },
                            "querystring": "",
                            "uri": "/default-uri"
                        }
                    }
                }
            ]
        }
    });

    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
        global.console = OLD_CONSOLE;

    });

    test('will log error and return origional request when an error is thrown', async () => {
        global.console = {
            log: jest.fn(),
            info: jest.fn(),
            error: jest.fn()
        }
        const mockEvent = { ...mockOriginRequestEvent };
        changeLanguageRegion.mockImplementationOnce(() => { throw new Error('A required config variable <> is not defined') })

        const result = await handler(mockEvent);
        expect(global.console.error).toHaveBeenCalledWith(new Error("A required config variable <> is not defined"));
        expect(result).toEqual(mockEvent.Records[0].cf.request)
    });

});

describe('handler - headers.cookie["language-region-override"]', () => {
    let mockOriginRequestEvent;
    beforeEach(() => {
        jest.resetModules();
        mockOriginRequestEvent = {
            "Records": [
                {
                    "cf": {
                        "config": {
                            "distributionDomainName": "d111111abcdef8.cloudfront.net",
                            "distributionId": "EDFDVBD6EXAMPLE",
                            "eventType": "origin-request",
                            "requestId": "4TyzHTaYWb1GX1qTfsHhEqV6HUDd_BzoBZnwfnvQc_1oF26ClkoUSEQ=="
                        },
                        "request": {
                            "clientIp": "203.0.113.178",
                            "headers": {
                                "x-forwarded-for": [
                                    {
                                        "key": "X-Forwarded-For",
                                        "value": "203.0.113.178"
                                    }
                                ],
                                "user-agent": [
                                    {
                                        "key": "User-Agent",
                                        "value": "Amazon CloudFront"
                                    }
                                ],
                                "via": [
                                    {
                                        "key": "Via",
                                        "value": "2.0 2afae0d44e2540f472c0635ab62c232b.cloudfront.net (CloudFront)"
                                    }
                                ],
                                "host": [
                                    {
                                        "key": "Host",
                                        "value": "example.org"
                                    }
                                ],
                                "cache-control": [
                                    {
                                        "key": "Cache-Control",
                                        "value": "no-cache, cf-no-cache"
                                    }
                                ]
                            },
                            "method": "GET",
                            "origin": {
                                "custom": {
                                    "customHeaders": {},
                                    "domainName": "example.org",
                                    "keepaliveTimeout": 5,
                                    "path": "",
                                    "port": 443,
                                    "protocol": "https",
                                    "readTimeout": 30,
                                    "sslProtocols": [
                                        "TLSv1",
                                        "TLSv1.1",
                                        "TLSv1.2"
                                    ]
                                }
                            },
                            "querystring": "",
                            "uri": "/default-uri"
                        }
                    }
                }
            ]
        }
    });

    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    test('will call parseCookie with cookie headers', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        mockEvent.Records[0].cf.request.uri = "/here-is-a-valid-uri";
        mockEvent.Records[0].cf.request.headers = {
            ...mockEvent.Records[0].cf.request.headers,
            'cookie': [
                {
                    "key": "Cookie",
                    "value": "language-region-override=EN-GB"
                }
            ]
        };

        const result = await handler(mockEvent);

        expect(parseCookie).toHaveBeenCalledTimes(1);
        expect(parseCookie).toHaveBeenCalledWith([
            {
                "key": "Cookie",
                "value": "language-region-override=EN-GB"
            }
        ]);
    });

    test('will use the cookie to set the correct url', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        mockEvent.Records[0].cf.request.uri = "/here-is-a-valid-uri";
        mockEvent.Records[0].cf.request.headers = {
            ...mockEvent.Records[0].cf.request.headers,
            'cookie': [
                {
                    "key": "Cookie",
                    "value": "language-region-override=EN-GB"
                }
            ]
        };
        parseCookie.mockImplementationOnce(() => ({
            "language-region-override": "EN-GB"
        }))
        changeLanguageRegion.mockImplementationOnce(() => "NEW_REQUEST")

        const result = await handler(mockEvent);
        expect(changeLanguageRegion).toHaveBeenCalledWith('/here-is-a-valid-uri', "en", "gb");
        expect(result).toEqual("NEW_REQUEST");
    });
});

describe('handler - headers["accept-language"][0].value and headers["cloudfront-viewer-country"][0].value', () => {
    let mockOriginRequestEvent;

    beforeEach(() => {
        mockOriginRequestEvent = {
            "Records": [
                {
                    "cf": {
                        "config": {
                            "distributionDomainName": "d111111abcdef8.cloudfront.net",
                            "distributionId": "EDFDVBD6EXAMPLE",
                            "eventType": "origin-request",
                            "requestId": "4TyzHTaYWb1GX1qTfsHhEqV6HUDd_BzoBZnwfnvQc_1oF26ClkoUSEQ=="
                        },
                        "request": {
                            "clientIp": "203.0.113.178",
                            "headers": {
                                "x-forwarded-for": [
                                    {
                                        "key": "X-Forwarded-For",
                                        "value": "203.0.113.178"
                                    }
                                ],
                                "user-agent": [
                                    {
                                        "key": "User-Agent",
                                        "value": "Amazon CloudFront"
                                    }
                                ],
                                "via": [
                                    {
                                        "key": "Via",
                                        "value": "2.0 2afae0d44e2540f472c0635ab62c232b.cloudfront.net (CloudFront)"
                                    }
                                ],
                                "host": [
                                    {
                                        "key": "Host",
                                        "value": "example.org"
                                    }
                                ],
                                "cache-control": [
                                    {
                                        "key": "Cache-Control",
                                        "value": "no-cache, cf-no-cache"
                                    }
                                ]
                            },
                            "method": "GET",
                            "origin": {
                                "custom": {
                                    "customHeaders": {},
                                    "domainName": "example.org",
                                    "keepaliveTimeout": 5,
                                    "path": "",
                                    "port": 443,
                                    "protocol": "https",
                                    "readTimeout": 30,
                                    "sslProtocols": [
                                        "TLSv1",
                                        "TLSv1.1",
                                        "TLSv1.2"
                                    ]
                                }
                            },
                            "querystring": "",
                            "uri": "/default-uri"
                        }
                    }
                }
            ]
        }
    });

    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    test('will call changeLanguageRegion with just uri if headers["accept-language"][0].value and headers["cloudfront-viewer-country"][0].value are undefined', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
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
        changeLanguageRegion.mockImplementationOnce(() => "NEW_REQUEST")

        const result = await handler(mockEvent);
        expect(changeLanguageRegion).toHaveBeenCalledWith('/default-uri');
        expect(result).toEqual("NEW_REQUEST")
    });

    test('will call changeLanguageRegion with just uri if headers["accept-language"][0].value is undefined', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
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
        changeLanguageRegion.mockImplementationOnce(() => "NEW_REQUEST")

        const result = await handler(mockEvent);
        expect(changeLanguageRegion).toHaveBeenCalledWith('/default-uri');
        expect(result).toEqual("NEW_REQUEST")
    });

    test('will call changeLanguageRegion with just uri if headers["cloudfront-viewer-country"][0].value is undefined', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
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
        changeLanguageRegion.mockImplementationOnce(() => "NEW_REQUEST")

        const result = await handler(mockEvent);
        expect(changeLanguageRegion).toHaveBeenCalledWith('/default-uri');
        expect(result).toEqual("NEW_REQUEST")
    });

    test('will call changeLanguageRegion with uri, headerLanguageCode and headerCountryCode if headers["cloudfront-viewer-country"][0].value are defined', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
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
                    "value": "EN"
                }
            ]
        };
        changeLanguageRegion.mockImplementationOnce(() => "NEW_REQUEST")

        const result = await handler(mockEvent);
        expect(changeLanguageRegion).toHaveBeenCalledWith('/default-uri', "en", "gb");
        expect(result).toEqual("NEW_REQUEST")
    });

    test('will call changeLanguageRegion with uri, headerLanguageCode and headerCountryCode if headers["cloudfront-viewer-country"][0].value are defined but with trimmed accept-language', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
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
                    "value": "EN-US"
                }
            ]
        };
        changeLanguageRegion.mockImplementationOnce(() => "NEW_REQUEST")

        const result = await handler(mockEvent);
        expect(changeLanguageRegion).toHaveBeenCalledWith('/default-uri', "en", "gb");
        expect(result).toEqual("NEW_REQUEST")
    });
});

describe('handler - will return origional request for missing URIs and ignore-paths', () => {
    let mockOriginRequestEvent;

    beforeEach(() => {
        mockOriginRequestEvent = {
            "Records": [
                {
                    "cf": {
                        "config": {
                            "distributionDomainName": "d111111abcdef8.cloudfront.net",
                            "distributionId": "EDFDVBD6EXAMPLE",
                            "eventType": "origin-request",
                            "requestId": "4TyzHTaYWb1GX1qTfsHhEqV6HUDd_BzoBZnwfnvQc_1oF26ClkoUSEQ=="
                        },
                        "request": {
                            "clientIp": "203.0.113.178",
                            "headers": {
                                "x-forwarded-for": [
                                    {
                                        "key": "X-Forwarded-For",
                                        "value": "203.0.113.178"
                                    }
                                ],
                                "user-agent": [
                                    {
                                        "key": "User-Agent",
                                        "value": "Amazon CloudFront"
                                    }
                                ],
                                "via": [
                                    {
                                        "key": "Via",
                                        "value": "2.0 2afae0d44e2540f472c0635ab62c232b.cloudfront.net (CloudFront)"
                                    }
                                ],
                                "host": [
                                    {
                                        "key": "Host",
                                        "value": "example.org"
                                    }
                                ],
                                "cache-control": [
                                    {
                                        "key": "Cache-Control",
                                        "value": "no-cache, cf-no-cache"
                                    }
                                ]
                            },
                            "method": "GET",
                            "origin": {
                                "custom": {
                                    "customHeaders": {},
                                    "domainName": "example.org",
                                    "keepaliveTimeout": 5,
                                    "path": "",
                                    "port": 443,
                                    "protocol": "https",
                                    "readTimeout": 30,
                                    "sslProtocols": [
                                        "TLSv1",
                                        "TLSv1.1",
                                        "TLSv1.2"
                                    ]
                                }
                            },
                            "querystring": "",
                            "uri": "/default-uri"
                        }
                    }
                }
            ]
        }
    });

    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    test('will not ignore valid uri', async () => {
        const mockEvent = { ...mockOriginRequestEvent };

        const validUri = "/here-is-a-valid-uri";
        mockEvent.Records[0].cf.request.uri = validUri;

        await handler(mockEvent);
        expect(changeLanguageRegion).toHaveBeenCalledWith(validUri);
    });

    test('will return origional request for undefined uri', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        mockEvent.Records[0].cf.request.uri = "";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing "page-data"', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        mockEvent.Records[0].cf.request.uri = "/page-data";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for and extended uri containing "page-data"', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        mockEvent.Records[0].cf.request.uri = "/here-is-a-url/with/page-data/in-the-middle";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".json"', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        mockEvent.Records[0].cf.request.uri = "/my-file.json";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".xml"', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        mockEvent.Records[0].cf.request.uri = "/my-file.xml";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".css"', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        mockEvent.Records[0].cf.request.uri = "/my-file.css";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".js"', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        mockEvent.Records[0].cf.request.uri = "/my-file.js";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".jpg"', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        mockEvent.Records[0].cf.request.uri = "/my-image-file.jpg";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".jpeg"', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        mockEvent.Records[0].cf.request.uri = "/my-image-file.jpg";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".svg"', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        mockEvent.Records[0].cf.request.uri = "/my-image-file.svg";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".png"', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        mockEvent.Records[0].cf.request.uri = "/my-image-file.png";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".webp"', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        mockEvent.Records[0].cf.request.uri = "/my-image-file.webp";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".jfif"', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        mockEvent.Records[0].cf.request.uri = "/my-image-file.jfif";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".pjpeg"', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        mockEvent.Records[0].cf.request.uri = "/my-image-file.pjpeg";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".pjp"', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        mockEvent.Records[0].cf.request.uri = "/my-image-file.pjp";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".gif"', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        mockEvent.Records[0].cf.request.uri = "/my-image-file.gif";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".avif"', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        mockEvent.Records[0].cf.request.uri = "/my-image-file.avif";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });

    test('will return origional request for uri containing ".apng"', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        mockEvent.Records[0].cf.request.uri = "/my-image-file.apng";

        const result = await handler(mockEvent);
        expect(result).toEqual(mockEvent.Records[0].cf.request);
    });
});
