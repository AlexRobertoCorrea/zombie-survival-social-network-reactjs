import Chance from 'chance';
import httpStatus from 'http-status';

import {
  fetchData,
  setPeopleId,
  handleInfectPerson
} from './List-people';
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
  
  describe('ensures that handleInfectPerson sets person infected correctly', () => {
    const expectedResponse = {
      status: httpStatus.ACCEPTED
    };
    const expectedPeopleFetched = [{
      status: httpStatus.OK,
      data: []
    }];
    
    const options = {
      person: getPersonData(),
      delator: getPersonData(),
      store: {
        peopleStore: {
          markPersonAsInfected: jest.fn().mockResolvedValue(expectedResponse),
          fetchPeople: jest.fn().mockResolvedValue(expectedPeopleFetched)
        }
      },
      notifier: {
        update: jest.fn()
      }
    };
    options.person.id = chance.hash();
    options.delator.id = chance.hash();
  
    it('ensures that store.peopleStore.markPersonAsInfected has been called', async () => {
      await handleInfectPerson(options);
    
      expect(options.store.peopleStore.markPersonAsInfected)
        .toHaveBeenCalledWith(options.person.id, options.delator.id);
    });
  
    it('ensures that store.peopleStore.fetchPeople has been called', async () => {
      await handleInfectPerson(options);
    
      expect(options.store.peopleStore.fetchPeople).toHaveBeenCalled();
    });
  
    it('ensures that notifier was called with success status', async () => {
      const expectNotifier = {
        message: `${options.person.name} was marked as infected`,
        variant: 'success'
      };
    
      await handleInfectPerson(options);
    
      expect(options.notifier.update).toHaveBeenCalledWith(expectNotifier);
    });
  });
});
