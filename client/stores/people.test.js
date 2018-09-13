import Chance from 'chance';

import * as peopleServices from '../services/people';
import PeopleStore from './people';

const chance = new Chance();

const getPersonData = () => ({
  location: chance.url(),
  name: chance.name(),
  age: chance.natural({ min: 1, max: 20 }),
  gender: chance.gender(),
  lonlat: chance.coordinates(),
  created_at: chance.birthday(),
  updated_at: chance.birthday(),
  infected: chance.bool()
});

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
