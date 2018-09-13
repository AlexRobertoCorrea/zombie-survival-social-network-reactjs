import Chance from 'chance';
import httpStatus from 'http-status';
import nock from 'nock';

import { fetchPeopleApi } from './people';

const chance = new Chance();

const getPersonData = () => ({
  location: chance.url(),
  name: chance.name(),
  age: chance.natural({ min: 1, max: 20 }),
  gender: chance.gender(),
  lonlat: chance.coordinates(),
  created_at: chance.birthday().toISOString(),
  updated_at: chance.birthday().toISOString(),
  infected: chance.bool()
});

describe('People service', () => {
  const API_ENDPOINT = 'http://zssn-backend-example.herokuapp.com';
  
  afterEach(nock.cleanAll);
  
  describe('fetchPeopleApi', () => {
    describe('fetchPeopleApi returns success', () => {
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
});
