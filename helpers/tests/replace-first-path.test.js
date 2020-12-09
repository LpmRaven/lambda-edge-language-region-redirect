const { replaceFirstPath } = require('../replace-first-path');
const { validateLanguageRegionCode } = require('../validate-language-region-code');

jest.mock('../validate-language-region-code', () => ({
    validateLanguageRegionCode: jest.fn()
}));

describe('replace-first-path', () => {

    beforeEach(() => {
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('will return path with added languageRegion', async () => {
        const languageRegion = "en-gb";
        const path = "/abc/123/test";
        validateLanguageRegionCode.mockImplementation(() => false)

        const result = await replaceFirstPath(path, languageRegion);
        expect(result).toEqual("/en-gb/abc/123/test");
    });

    test('will return path with replaced languageRegion', async () => {
        const languageRegion = "en-gb";
        const path = "/en-nz/abc/123/test";
        validateLanguageRegionCode
            .mockImplementationOnce(() => false)
            .mockImplementationOnce(() => true)
            .mockImplementationOnce(() => false)
            .mockImplementationOnce(() => false)
            .mockImplementationOnce(() => false)

        const result = await replaceFirstPath(path, languageRegion);
        expect(result).toEqual("/en-gb/abc/123/test");
    });
})
