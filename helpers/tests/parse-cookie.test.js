const { parseCookie } = require('../parse-cookie');

describe('parse-cookie', () => {

    beforeEach(() => {
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('will return a key value pair for a single cookie value', async () => {
        const headersCookie = [
            {
                "key": "Cookie",
                "value": "language-region-override=EN-GB"
            }
        ]

        const result = await parseCookie(headersCookie);
        expect(result).toEqual({ "language-region-override": "EN-GB" });
    });

    test('will return multiple key value pair for a multiple cookie values', async () => {
        const headersCookie = [
            {
                "key": "Cookie",
                "value": "language-region-override=EN-GB; another-cookie=test"
            }
        ]

        const result = await parseCookie(headersCookie);
        expect(result).toEqual({ "language-region-override": "EN-GB", "another-cookie": "test" });
    });

    test('will return empty object for no cookies', async () => {
        const headersCookie = [];
        const result = await parseCookie(headersCookie);
        expect(result).toEqual({});
    });

    test('will return empty object for undefined cookie values', async () => {
        const headersCookie = [{
            "key": "Cookie",
            "value": ";"
        }];
        const result = await parseCookie(headersCookie);
        expect(result).toEqual({});
    });
})
