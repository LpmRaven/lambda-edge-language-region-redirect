const { changeLanguageRegion } = require('../change-language-region');
const { languageConfig, languageFallback, domainDefaultLanguage } = require('../../language-config');
const { countryConfig, countryFallback, domainDefaultCountry } = require('../../country-config');
const { checkRequiredConfig } = require('../check-required-config');
const { getCustomResponseWithUrl } = require('../get-custom-response-with-url');
const { getLanguageRegionPath } = require('../get-language-region-path');
const { getLanguageRegion } = require('../get-language-region');

jest.mock('../../language-config', () => ({
    languageConfig: [
        {
            "code": "aa",
            "name": "Afar",
            "nativeName": "Afaraf",
            "enabled": false
        },
        {
            "code": "ab",
            "name": "Abkhaz",
            "nativeName": "аҧсуа бызшәа",
            "enabled": false
        }
    ],
    languageFallback: 'FL',
    domainDefaultLanguage: 'ZL'
}));

jest.mock('../../country-config', () => ({
    countryConfig: [
        {
            "code": "AD",
            "name": "Andorra",
            "enabled": false
        },
        {
            "code": "AE",
            "name": "United Arab Emirates",
            "enabled": false
        }
    ],
    countryFallback: 'FC',
    domainDefaultCountry: 'ZC'
}));

jest.mock('../check-required-config', () => ({
    checkRequiredConfig: jest.fn(),
}));

jest.mock('../get-custom-response-with-url', () => ({
    getCustomResponseWithUrl: jest.fn(),
}));

jest.mock('../get-language-region-path', () => ({
    getLanguageRegionPath: jest.fn(),
}));

jest.mock('../get-language-region', () => ({
    getLanguageRegion: jest.fn(),
}));

describe('change-language-region', () => {

    beforeEach(() => {
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('will return correctly with fallback language and country ', async () => {
        const expectedResult = {
            status: '302',
            statusDescription: 'Found',
            headers: {
                location: [{
                    key: 'Location',
                    value: "mockUrl",
                }],
                'cache-control': [{
                    key: 'Cache-Control',
                    value: "max-age=3600"
                }],
            },
        };

        checkRequiredConfig.mockImplementationOnce(() => true);
        getCustomResponseWithUrl.mockReturnValue(expectedResult);
        getLanguageRegionPath.mockReturnValue("mockUrlPath");
        getLanguageRegion.mockReturnValueOnce("fl-fc").mockReturnValueOnce("zl-zc");

        const result = await changeLanguageRegion('mockUrl');
        expect(checkRequiredConfig).toHaveBeenNthCalledWith(1, { languageFallback, countryFallback, domainDefaultLanguage, domainDefaultCountry });
        expect(getLanguageRegion).toHaveBeenNthCalledWith(1, languageConfig, countryConfig, 'fl', 'fc', 'fl', 'fc');
        expect(getLanguageRegion).toHaveBeenNthCalledWith(2, languageConfig, countryConfig, 'zl', 'zc', 'fl', 'fc');
        expect(getLanguageRegionPath).toHaveBeenNthCalledWith(1, 'zl-zc', 'fl-fc', 'mockUrl');
        expect(getCustomResponseWithUrl).toHaveBeenNthCalledWith(1, "mockUrlPath");
        expect(result).toEqual(expectedResult);
    });

    test('will return correctly with language and country ', async () => {
        const expectedResult = {
            status: '302',
            statusDescription: 'Found',
            headers: {
                location: [{
                    key: 'Location',
                    value: "mockUrl",
                }],
                'cache-control': [{
                    key: 'Cache-Control',
                    value: "max-age=3600"
                }],
            },
        };

        checkRequiredConfig.mockImplementationOnce(() => true);
        getCustomResponseWithUrl.mockReturnValue(expectedResult);
        getLanguageRegionPath.mockReturnValue("mockUrlPath");
        getLanguageRegion.mockReturnValueOnce("xl-xc").mockReturnValueOnce("zl-zc");

        const result = await changeLanguageRegion('mockUrl', "XL", "XC");
        expect(checkRequiredConfig).toHaveBeenNthCalledWith(1, { languageFallback, countryFallback, domainDefaultLanguage, domainDefaultCountry });
        expect(getLanguageRegion).toHaveBeenNthCalledWith(1, languageConfig, countryConfig, 'xl', 'xc', 'fl', 'fc');
        expect(getLanguageRegion).toHaveBeenNthCalledWith(2, languageConfig, countryConfig, 'zl', 'zc', 'fl', 'fc');
        expect(getLanguageRegionPath).toHaveBeenNthCalledWith(1, 'zl-zc', 'xl-xc', 'mockUrl');
        expect(getCustomResponseWithUrl).toHaveBeenNthCalledWith(1, "mockUrlPath");
        expect(result).toEqual(expectedResult);
    });
})
