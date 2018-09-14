import Chance from 'chance';
import httpStatus from 'http-status';

import { getPersonData } from '../helpers/test';
import * as peopleServices from '../services/people';
import PeopleStore from './people';

const chance = new Chance();

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
  
  describe('Mark a person as infected successfully', () => {
    const peopleStore = PeopleStore.create();
    let response;
    const expectedResponse = {
      status: httpStatus.ACCEPTED
    };
    const personId = chance.hash();
    const delatorId = chance.hash();
    
    beforeEach(async () => {
      peopleServices.markPersonInfectedApi = jest.fn().mockResolvedValue(expectedResponse);
      
      response = await peopleStore.markPersonAsInfected(personId, delatorId);
    });
    
    afterAll(() => {
      peopleServices.markPersonInfectedApi.mockRestore();
    });
    
    it('ensures peopleServices.markPersonInfectedApi has been called', () => {
      expect(peopleServices.markPersonInfectedApi).toHaveBeenCalledWith(personId, delatorId);
    });
    
    it('has peopleStore.savingData property set as false', () => {
      expect(peopleStore.savingData).toBeFalsy();
    });
    
    it('ensures that person was marked as infected correctly', () => {
      expect(response).toEqual(expectedResponse);
    });
  });
  
  describe('Error on marking a person as infected', () => {
    const peopleStore = PeopleStore.create();
    const personId = chance.hash();
    const delatorId = chance.hash();
    const error = new Error();
    let errorResponse;
    
    beforeEach(async () => {
      peopleServices.markPersonInfectedApi = jest.fn().mockRejectedValue(error);
      
      try {
        await peopleStore.markPersonAsInfected(personId, delatorId);
      } catch (err) {
        errorResponse = err;
      }
    });
    
    afterAll(() => {
      peopleServices.markPersonInfectedApi.mockRestore();
    });
    
    it('ensures peopleServices.markPersonInfectedApi has been called', () => {
      expect(peopleServices.markPersonInfectedApi).toHaveBeenCalledWith(personId, delatorId);
    });
    
    it('has peopleStore.savingData property set as true', () => {
      expect(peopleStore.savingData).toBeTruthy();
    });
    
    it('ensures that the person was not marked as infected', () => {
      expect(errorResponse).toEqual(error);
    });
  });
});
