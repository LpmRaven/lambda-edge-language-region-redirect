const { getLanguageRegion } = require('../get-language-region');
const languages = require('iso-639-1');
const countries = require('country-list');

jest.mock('iso-639-1', () => ({
    validate: jest.fn()
}));

jest.mock('country-list', () => ({
    getName: jest.fn()
}));

describe('get-language-region', () => {

    beforeEach(() => {
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('will return ', async () => {
        // let mockEvent = mockOriginRequestEvent;
        // mockEvent.Records[0].cf.request.uri = "";

        // const result = await handler(mockEvent);
        // expect(result).toEqual(mockEvent.Records[0].cf.request);
    });
})
