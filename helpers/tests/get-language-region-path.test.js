const { getLanguageRegionPath } = require('../get-language-region-path');
const { replaceFirstPath } = require('../replace-first-path');

jest.mock('../replace-first-path', () => ({
    replaceFirstPath: jest.fn()
}));

describe('check required fields', () => {

    beforeEach(() => {
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('will return an empty root path when languageRegion is the domain Default languageRegion', async () => {
        const domainDefaultLanguageRegion = "en-us";
        const languageRegion = "en-us";
        const path = "/";

        const result = await getLanguageRegionPath(path, languageRegion, domainDefaultLanguageRegion);
        expect(result).toEqual("/");
    });

    test('will return languageRegion root path when languageRegion is not the domain Default languageRegion', async () => {
        const domainDefaultLanguageRegion = "en-us";
        const languageRegion = "en-gb";
        const path = "/";

        const result = await getLanguageRegionPath(path, languageRegion, domainDefaultLanguageRegion);
        expect(result).toEqual("/en-gb");
    });

    test('will return a path without languageRegion included when languageRegion is the domain Default languageRegion', async () => {
        const domainDefaultLanguageRegion = "en-us";
        const languageRegion = "en-us";
        const path = "/abc/123/test";

        const result = await getLanguageRegionPath(path, languageRegion, domainDefaultLanguageRegion);
        expect(result).toEqual("/abc/123/test");
    });

    test('will return a path with a languageRegion included when languageRegion is not the domain Default languageRegion', async () => {
        const domainDefaultLanguageRegion = "en-us";
        const languageRegion = "en-gb";
        const path = "/abc/123/test";

        const result = await getLanguageRegionPath(path, languageRegion, domainDefaultLanguageRegion);
        expect(replaceFirstPath).toHaveBeenCalledWith(path, languageRegion);
    });
})
