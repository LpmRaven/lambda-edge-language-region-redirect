const { handler } = require('../handler');

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

    test('will return correct request for root domain with valid headers', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        const uri = "/index.html";
        mockEvent.Records[0].cf.request.uri = uri;
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

        const result = await handler(mockEvent);
        expect(result).toEqual(
            {
                "headers":
                {
                    "cache-control": [
                        {
                            "key": "Cache-Control",
                            "value": "max-age=3600"
                        }
                    ],
                    "location": [
                        {
                            "key": "Location",
                            "value": "/en-gb/index.html"
                        }
                    ]
                },
                "status": "302",
                "statusDescription": "Found"
            }
        );
    });

    test('will return correct request for non-root domain with valid headers', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        const uri = "/test-uri/with-some/more-path";
        mockEvent.Records[0].cf.request.uri = uri;
        mockEvent.Records[0].cf.request.headers = {
            ...mockEvent.Records[0].cf.request.headers,
            'cloudfront-viewer-country': [
                {
                    "key": "Cloudfront-Viewer-Country",
                    "value": "AU"
                }
            ],
            'accept-language': [
                {
                    "key": "Accept-Language",
                    "value": "EN-US"
                }
            ]
        };

        const result = await handler(mockEvent);
        expect(result).toEqual(
            {
                "headers":
                {
                    "cache-control": [
                        {
                            "key": "Cache-Control",
                            "value": "max-age=3600"
                        }
                    ],
                    "location": [
                        {
                            "key": "Location",
                            "value": "/en-au/test-uri/with-some/more-path/index.html"
                        }
                    ]
                },
                "status": "302",
                "statusDescription": "Found"
            }
        );
    });

    test('will return correct request for non-root domain with valid cookie headers', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        const uri = "/test-uri/with-some/more-path";
        mockEvent.Records[0].cf.request.uri = uri;
        mockEvent.Records[0].cf.request.headers = {
            ...mockEvent.Records[0].cf.request.headers,
            'cloudfront-viewer-country': [
                {
                    "key": "Cloudfront-Viewer-Country",
                    "value": "AU"
                }
            ],
            'accept-language': [
                {
                    "key": "Accept-Language",
                    "value": "EN-US"
                }
            ],
            'cookie': [
                {
                    "key": "Cookie",
                    "value": "language-region-override=EN-GB"
                }
            ]
        };

        const result = await handler(mockEvent);
        expect(result).toEqual(
            {
                "headers":
                {
                    "cache-control": [
                        {
                            "key": "Cache-Control",
                            "value": "max-age=3600"
                        }
                    ],
                    "location": [
                        {
                            "key": "Location",
                            "value": "/en-gb/test-uri/with-some/more-path/index.html"
                        }
                    ]
                },
                "status": "302",
                "statusDescription": "Found"
            }
        );
    });

    test('will return correct request for root domain with valid cookie headers', async () => {
        const mockEvent = { ...mockOriginRequestEvent };
        const uri = "/index.html";
        mockEvent.Records[0].cf.request.uri = uri;
        mockEvent.Records[0].cf.request.headers = {
            ...mockEvent.Records[0].cf.request.headers,
            'cloudfront-viewer-country': [
                {
                    "key": "Cloudfront-Viewer-Country",
                    "value": "CA"
                }
            ],
            'accept-language': [
                {
                    "key": "Accept-Language",
                    "value": "EN-NZ"
                }
            ],
            'cookie': [
                {
                    "key": "Cookie",
                    "value": "language-region-override=EN-AU"
                }
            ]
        };

        const result = await handler(mockEvent);
        expect(result).toEqual(
            {
                "headers":
                {
                    "cache-control": [
                        {
                            "key": "Cache-Control",
                            "value": "max-age=3600"
                        }
                    ],
                    "location": [
                        {
                            "key": "Location",
                            "value": "/en-au/index.html"
                        }
                    ]
                },
                "status": "302",
                "statusDescription": "Found"
            }
        );
    });
});
