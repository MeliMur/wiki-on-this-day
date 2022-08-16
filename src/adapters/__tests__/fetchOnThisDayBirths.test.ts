import {fetchOnThisDayBirths} from "../fetchOnThisDayBirths";

global.fetch = jest.fn() as jest.Mock;


describe('fetchOnThisDayBirths', () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
    });

    test('should return data', async () => {
        (fetch as jest.Mock).mockImplementation(() => Promise.resolve(new Response(JSON.stringify({births: 'some data'}), {
            status: 200
        })));
        const apiCall = await fetchOnThisDayBirths(new Date())

        expect(apiCall).toBe('some data');
    });

    test('should throw error', async () => {
        (fetch as jest.Mock).mockImplementation(() => Promise.reject("API is down"));

        try {
            await fetchOnThisDayBirths(new Date());
        } catch (e) {
            expect(e).toBe('API is down');
        }
    });
});
