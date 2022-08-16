import {OnThisDayBirthsStore} from "../OnThisDayBirths.store";

jest.mock('../../adapters/fetchOnThisDayBirths', () => ({
    fetchOnThisDayBirths: () => [{
        text: "Chris P. Bacon",
        year: 1999
    },
        {
            text: "Jack Pott",
            year: 1997
        }]
}));

describe('OnThisDayBirthsStore', () => {
    test('should return ordered data', async () => {
        const store = new OnThisDayBirthsStore();
        await store.fetchBirths();

        expect(store.birthDays).toEqual([{
            text: "Jack Pott",
            year: 1997
        }, {
            text: "Chris P. Bacon",
            year: 1999
        },
        ]);
    });

    test('should be loading', () => {
        const store = new OnThisDayBirthsStore();
        store.fetchBirths();

        expect(store.isLoading).toBe(true);
    });
});
