import { getPersonData } from '../helpers/test';
import * as peopleServices from '../services/people';
import PeopleStore from './people';

describe('People store', () => {
  describe('Fetch people successfully', () => {
    const peopleStore = PeopleStore.create();
    const expectedPeople = [getPersonData()];
    
    beforeEach(() => {
      peopleServices.fetchPeopleApi = jest.fn().mockResolvedValue(expectedPeople);
    });
    
    afterAll(() => {
      peopleServices.fetchPeopleApi.mockRestore();
    });
    
    it('ensures peopleServices.fetchPeopleApi has been called', async () => {
      await peopleStore.fetchPeople();
      
      expect(peopleServices.fetchPeopleApi).toHaveBeenCalled();
    });
    
    it('has peopleStore.fetchPeople property set as false', async () => {
      await peopleStore.fetchPeople();
      
      expect(peopleStore.fetchingData).toBeFalsy();
    });
    
    it('ensures that people was fetched correctly', async () => {
      await peopleStore.fetchPeople();
      
      expect(peopleStore.people).toEqual(expectedPeople);
    });
  });
});
