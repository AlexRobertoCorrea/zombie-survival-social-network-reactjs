import { fetchData } from './List-people';

describe('List People State', () => {
  describe('fetchData fetches people correctly', () => {
    const store = {};
    
    beforeAll(async () => {
      store.peopleStore = {
        fetchPeople: jest.fn()
      };
    });
    
    afterAll(() => {
      store.peopleStore.fetchPeople.mockRestore();
    });
    
    
    it('ensures that store.peopleStore.fetchPeople was called', async () => {
      await fetchData(store);
      
      expect(store.peopleStore.fetchPeople).toHaveBeenCalled();
    });
  });
});
