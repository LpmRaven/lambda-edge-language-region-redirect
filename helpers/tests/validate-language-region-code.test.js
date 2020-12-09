const { validateLanguageRegionCode } = require('../validate-language-region-code');
const languages = require('iso-639-1');
const countries = require('country-list');

jest.mock('iso-639-1', () => ({
    validate: jest.fn()
}));

jest.mock('country-list', () => ({
    getName: jest.fn()
}));

describe('validate-language-region-code', () => {

    beforeEach(() => {
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('will return true for valid language and country', async () => {
        const languageRegion = "en-gb";
        languages.validate.mockImplementation(() => true)
        countries.getName.mockImplementation(() => true)

        const result = await validateLanguageRegionCode(languageRegion);
        expect(result).toEqual(true);
    });

    test('will return false for invalid langauge', async () => {
        const languageRegion = "en-gb";
        languages.validate.mockImplementation(() => false)
        countries.getName.mockImplementation(() => true)

        const result = await validateLanguageRegionCode(languageRegion);
        expect(result).toEqual(false);
    });

    test('will return false for invalid country', async () => {
        const languageRegion = "en-gb";
        languages.validate.mockImplementation(() => true)
        countries.getName.mockImplementation(() => false)

        const result = await validateLanguageRegionCode(languageRegion);
        expect(result).toEqual(false);
    });

    test('will return false for languageRegion with length greater than 5', async () => {
        const languageRegion = "en-gbb";
        languages.validate.mockImplementation(() => true)
        countries.getName.mockImplementation(() => true)

        const result = await validateLanguageRegionCode(languageRegion);
        expect(result).toEqual(false);
    });

    test('will return false for languageRegion with length less than 5', async () => {
        const languageRegion = "en-b";
        languages.validate.mockImplementation(() => true)
        countries.getName.mockImplementation(() => true)

        const result = await validateLanguageRegionCode(languageRegion);
        expect(result).toEqual(false);
    });
})
