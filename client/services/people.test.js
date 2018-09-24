import Chance from 'chance';
import httpStatus from 'http-status';
import nock from 'nock';

import {
  createPersonApi,
  fetchPeopleApi,
  markPersonInfectedApi
} from './people';
import { getPersonData } from '../helpers/test';

const chance = new Chance();

describe('People service', () => {
  const API_ENDPOINT = 'http://zssn-backend-example.herokuapp.com';
  
  afterEach(nock.cleanAll);
  
  describe('fetchPeopleApi', () => {
    describe('returns success', () => {
      const url = '/api/people.json';
      
      const response = {
        status: httpStatus.OK,
        data: [getPersonData()]
      };
  
      const expectedData = response.data;
      const firstPeopleIndex = 0;
      expectedData[firstPeopleIndex].created_at = new Date(expectedData[firstPeopleIndex].created_at);
      expectedData[firstPeopleIndex].updated_at = new Date(expectedData[firstPeopleIndex].updated_at);
      
      it('ensures that response is returned correctly', async () => {
        nock(API_ENDPOINT)
          .get(url)
          .reply(response.status, response.data);
        
        const data = await fetchPeopleApi();
        
        expect(data).toEqual(expectedData);
      });
    });
    
    describe('ensures that fetchPeopleApi returns error', () => {
      const code = httpStatus.INTERNAL_SERVER_ERROR;
      
      const url = '/api/people.json';
      
      it('failure', async () => {
        const expectedNumAssertions = 1;
        expect.assertions(expectedNumAssertions);
        
        nock(API_ENDPOINT)
          .get(url)
          .replyWithError({ code });
        
        try {
          await fetchPeopleApi();
        } catch (err) {
          expect(err.code).toBe(code);
        }
      });
    });
  });
  
  describe('markPersonInfectedApi', () => {
    describe('returns success', () => {
      const personId = chance.hash();
      const delatorId = chance.hash();
      
      const url = `/api/people/${delatorId}/report_infection.json`;
      
      const response = {
        status: httpStatus.ACCEPTED
      };
      
      it('ensures that person is marked as infected correctly', async () => {
        nock(API_ENDPOINT)
          .post(url)
          .reply(response.status);
        
        const res = await markPersonInfectedApi(personId, delatorId);
        
        expect(res).toEqual(response);
      });
    });
    
    describe('returns error', () => {
      const personId = chance.hash();
      const delatorId = chance.hash();
  
      const url = `/api/people/${delatorId}/report_infection.json`;

      const code = httpStatus.INTERNAL_SERVER_ERROR;

      it('failure', async () => {
        nock(API_ENDPOINT)
          .post(url)
          .replyWithError({ code });

        try {
          await markPersonInfectedApi(personId, delatorId);
        } catch (err) {
          expect(err.code).toBe(code);
        }
      });
    });
  });
  
  describe('createPersonApi', () => {
    describe('when success is returned', () => {
      const person = {};
      
      const url = '/api/people.json';
      
      const response = {
        status: httpStatus.CREATED,
        data: person
      };
      
      it('ensures that person is saved correctly', async () => {
        nock(API_ENDPOINT)
          .post(url)
          .reply(response.status, response.data);
        
        const res = await createPersonApi(person);
        
        expect(res).toEqual(response);
      });
    });
    
    describe('when error is returned', () => {
      const person = {};
  
      const url = '/api/people.json';
      
      const code = httpStatus.INTERNAL_SERVER_ERROR;
      
      it('ensures that person is not saved', async () => {
        nock(API_ENDPOINT)
          .post(url)
          .replyWithError({ code });
        
        try {
          await createPersonApi(person);
        } catch (err) {
          expect(err.code).toBe(code);
        }
      });
    });
  });
});
