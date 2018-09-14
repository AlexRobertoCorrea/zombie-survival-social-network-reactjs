import Chance from 'chance';

import { fetchData, setPeopleId } from './List-people';
import { getPersonData } from '../../helpers/test';

const chance = new Chance();

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
  
  describe('set id at people data correctly', () => {
    const personId = chance.url();
    const baseUrl = 'http://zssn-backend-example.herokuapp.com/api/people/';
    const data = {
      location: `${baseUrl}${personId}`
    };
    const people = [getPersonData(data)];
  
    const peopleReturned = setPeopleId(people);
  
    it('ensures that person id has an id', async () => {
      const firstPersonIndex = 0;
      
      expect(peopleReturned[firstPersonIndex].id).toBe(personId);
    });
  });
});
