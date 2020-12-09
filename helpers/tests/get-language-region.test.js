const { getLanguageRegion } = require('../get-language-region');
const languages = require('iso-639-1');
const countries = require('country-list');

jest.mock('iso-639-1', () => ({
    validate: jest.fn()
}));

jest.mock('country-list', () => ({
    getName: jest.fn()
}));

describe('error handling', () => {

    beforeEach(() => {
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('will throw error when languageCode is invalid', async () => {
        global.console = {
            log: jest.fn(),
            info: jest.fn(),
            error: jest.fn()
        };

        languages.validate.mockImplementationOnce(() => false);
        const languageConfig = [
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
        ];
        const languageFallback = 'fl';
        const countryConfig = [
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
        ];
        const countryFallback = 'fc';
        const tempLanguageCode = 'xl';
        const tempCountryCode = 'xc';

        await expect(() => { getLanguageRegion(languageConfig, countryConfig, tempLanguageCode, tempCountryCode, languageFallback, countryFallback) })
            .toThrow(new Error(`Language Code 'xl' is invalid`));
    });

    test('will throw error when countryCode is invalid', async () => {
        global.console = {
            log: jest.fn(),
            info: jest.fn(),
            error: jest.fn()
        };

        languages.validate.mockImplementationOnce(() => true);
        countries.getName.mockImplementationOnce(() => false);

        const languageConfig = [
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
        ];
        const languageFallback = 'fl';
        const countryConfig = [
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
        ];
        const countryFallback = 'fc';
        const tempLanguageCode = 'xl';
        const tempCountryCode = 'xc';

        await expect(() => { getLanguageRegion(languageConfig, countryConfig, tempLanguageCode, tempCountryCode, languageFallback, countryFallback) })
            .toThrow(new Error(`Country Code 'xc' is invalid`));
    });
})

describe('get-language-region', () => {

    beforeEach(() => {
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('will return languageRegion of languageFallback and countryFallback when tempLanguageCode and tempCountryCode are invalid', async () => {
        languages.validate.mockImplementationOnce(() => true);
        countries.getName.mockImplementationOnce(() => true);

        const languageConfig = [
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
        ];
        const languageFallback = 'fl';
        const countryConfig = [
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
        ];
        const countryFallback = 'fc';
        const tempLanguageCode = 'xl';
        const tempCountryCode = 'xc';

        const result = await getLanguageRegion(languageConfig, countryConfig, tempLanguageCode, tempCountryCode, languageFallback, countryFallback);
        expect(result).toEqual('fl-fc');
    });

    test('will return languageRegion of languageFallback and countryFallback when tempLanguageCode and tempCountryCode are valid but disabled', async () => {
        languages.validate.mockImplementationOnce(() => true);
        countries.getName.mockImplementationOnce(() => true);

        const languageConfig = [
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
            },
            {
                "code": "xl",
                "name": "Text Language",
                "nativeName": "text language",
                "enabled": false
            }
        ];
        const languageFallback = 'fl';
        const countryConfig = [
            {
                "code": "AD",
                "name": "Andorra",
                "enabled": false
            },
            {
                "code": "AE",
                "name": "United Arab Emirates",
                "enabled": false
            },
            {
                "code": "XC",
                "name": "text country",
                "enabled": false
            }
        ];
        const countryFallback = 'fc';
        const tempLanguageCode = 'xl';
        const tempCountryCode = 'xc';

        const result = await getLanguageRegion(languageConfig, countryConfig, tempLanguageCode, tempCountryCode, languageFallback, countryFallback);
        expect(result).toEqual('fl-fc');
    });

    test('will return languageRegion of tempLanguageCode and tempCountryCode when they are valid and enabled', async () => {
        languages.validate.mockImplementationOnce(() => true);
        countries.getName.mockImplementationOnce(() => true);

        const languageConfig = [
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
            },
            {
                "code": "xl",
                "name": "Text Language",
                "nativeName": "text language",
                "enabled": true
            }
        ];
        const languageFallback = 'fl';
        const countryConfig = [
            {
                "code": "AD",
                "name": "Andorra",
                "enabled": false
            },
            {
                "code": "AE",
                "name": "United Arab Emirates",
                "enabled": false
            },
            {
                "code": "XC",
                "name": "text country",
                "enabled": true
            }
        ];
        const countryFallback = 'fc';
        const tempLanguageCode = 'xl';
        const tempCountryCode = 'xc';

        const result = await getLanguageRegion(languageConfig, countryConfig, tempLanguageCode, tempCountryCode, languageFallback, countryFallback);
        expect(result).toEqual('xl-xc');
    });

    test('will return languageRegion of tempLanguageCode and countryFallback when tempCountryCode is disabled', async () => {
        languages.validate.mockImplementationOnce(() => true);
        countries.getName.mockImplementationOnce(() => true);

        const languageConfig = [
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
            },
            {
                "code": "xl",
                "name": "Text Language",
                "nativeName": "text language",
                "enabled": true
            }
        ];
        const languageFallback = 'fl';
        const countryConfig = [
            {
                "code": "AD",
                "name": "Andorra",
                "enabled": false
            },
            {
                "code": "AE",
                "name": "United Arab Emirates",
                "enabled": false
            },
            {
                "code": "XC",
                "name": "text country",
                "enabled": false
            }
        ];
        const countryFallback = 'fc';
        const tempLanguageCode = 'xl';
        const tempCountryCode = 'xc';

        const result = await getLanguageRegion(languageConfig, countryConfig, tempLanguageCode, tempCountryCode, languageFallback, countryFallback);
        expect(result).toEqual('xl-fc');
    });

    test('will return languageRegion of languageFallback and tempCountryCode when tempLanguageCode is disabled', async () => {
        languages.validate.mockImplementationOnce(() => true);
        countries.getName.mockImplementationOnce(() => true);

        const languageConfig = [
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
            },
            {
                "code": "xl",
                "name": "Text Language",
                "nativeName": "text language",
                "enabled": false
            }
        ];
        const languageFallback = 'fl';
        const countryConfig = [
            {
                "code": "AD",
                "name": "Andorra",
                "enabled": false
            },
            {
                "code": "AE",
                "name": "United Arab Emirates",
                "enabled": false
            },
            {
                "code": "XC",
                "name": "text country",
                "enabled": true
            }
        ];
        const countryFallback = 'fc';
        const tempLanguageCode = 'xl';
        const tempCountryCode = 'xc';

        const result = await getLanguageRegion(languageConfig, countryConfig, tempLanguageCode, tempCountryCode, languageFallback, countryFallback);
        expect(result).toEqual('fl-xc');
    });
})
