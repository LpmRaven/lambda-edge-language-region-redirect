const { checkRequiredConfig } = require('../check-required-config');

describe('check required fields', () => {

    beforeEach(() => {
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('will return true when all required fields are present', async () => {
        const mockLanguageFallback = "mockLanguageFallback";
        const mockCountryFallback = "mockCountryFallback";
        const mockDomainDefaultLanguage = "mockDefaultLanguage";
        const mockDomainDefaultCountry = "mockDefaultCountry";

        const result = await checkRequiredConfig({ languageFallback: mockLanguageFallback, countryFallback: mockCountryFallback, domainDefaultLanguage: mockDomainDefaultLanguage, domainDefaultCountry: mockDomainDefaultCountry });
        expect(result).toEqual(true);
    });

    test('will throw error when languageFallback is missing', async () => {
        const mockLanguageFallback = undefined;
        const mockCountryFallback = "mockCountryFallback";
        const mockDomainDefaultLanguage = "mockDefaultLanguage";
        const mockDomainDefaultCountry = "mockDefaultCountry";

        await expect(() => { checkRequiredConfig({ languageFallback: mockLanguageFallback, countryFallback: mockCountryFallback, domainDefaultLanguage: mockDomainDefaultLanguage, domainDefaultCountry: mockDomainDefaultCountry }) })
            .toThrow(new Error('A required config variable <languageFallback> is not defined'));
    });

    test('will throw error when countryFallback is missing', async () => {
        const mockLanguageFallback = "mockLanguageFallback";
        const mockCountryFallback = undefined;
        const mockDomainDefaultLanguage = "mockDefaultLanguage";
        const mockDomainDefaultCountry = "mockDefaultCountry";

        await expect(() => { checkRequiredConfig({ languageFallback: mockLanguageFallback, countryFallback: mockCountryFallback, domainDefaultLanguage: mockDomainDefaultLanguage, domainDefaultCountry: mockDomainDefaultCountry }) })
            .toThrow(new Error('A required config variable <countryFallback> is not defined'));
    });

    test('will throw error when domainDefaultLanguage is missing', async () => {
        const mockLanguageFallback = "mockLanguageFallback";
        const mockCountryFallback = "mockCountryFallback";
        const mockDomainDefaultLanguage = undefined;
        const mockDomainDefaultCountry = "mockDefaultCountry";

        await expect(() => { checkRequiredConfig({ languageFallback: mockLanguageFallback, countryFallback: mockCountryFallback, domainDefaultLanguage: mockDomainDefaultLanguage, domainDefaultCountry: mockDomainDefaultCountry }) })
            .toThrow(new Error('A required config variable <domainDefaultLanguage> is not defined'));
    });

    test('will throw error when domainDefaultCountry is missing', async () => {
        const mockLanguageFallback = "mockLanguageFallback";
        const mockCountryFallback = "mockCountryFallback";
        const mockDomainDefaultLanguage = "mockDefaultLanguage";
        const mockDomainDefaultCountry = undefined;

        await expect(() => { checkRequiredConfig({ languageFallback: mockLanguageFallback, countryFallback: mockCountryFallback, domainDefaultLanguage: mockDomainDefaultLanguage, domainDefaultCountry: mockDomainDefaultCountry }) })
            .toThrow(new Error('A required config variable <domainDefaultCountry> is not defined'));
    });
})
