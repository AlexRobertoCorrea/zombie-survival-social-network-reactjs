import { types, flow } from 'mobx-state-tree';

import {
  createPersonApi,
  fetchPeopleApi,
  markPersonInfectedApi
} from '../services/people';

const PersonModel = types
  .model('PersonModel', {
    location: types.maybe(types.string),
    name: types.maybe(types.string),
    age: types.maybe(types.number),
    gender: types.maybe(types.string),
    lonlat: types.maybeNull(types.string),
    created_at: types.maybe(types.Date),
    updated_at: types.maybe(types.Date),
    infected: types.maybe(types.boolean)
  });

const PersonData = types
  .model('PersonData', {
    data: types.optional(PersonModel, {}),
    status: types.maybe(types.number)
  });

const PeopleStore = types
  .model('PeopleStore', {
    people: types.optional(types.array(PersonModel), []),
    person: types.optional(PersonData, {}),
    fetchingData: types.optional(types.boolean, false),
    savingData: types.optional(types.boolean, false)
  })
  .actions((self) => {
    const createPerson = flow(function* (person) {
      self.creatingData = true;
    
      self.person = yield createPersonApi(person);
    
      self.creatingData = false;
    
      return self.person;
    });
    
    const fetchPeople = flow(function* () {
      self.fetchingData = true;
  
      self.people = yield fetchPeopleApi();
  
      self.fetchingData = false;
    });
    
    const markPersonAsInfected = flow(function* (personId, delatorId) {
      self.savingData = true;
  
      const response = yield markPersonInfectedApi(personId, delatorId);
  
      self.savingData = false;
      
      return response;
    });
    
    return {
      createPerson,
      fetchPeople,
      markPersonAsInfected
    };
  });

export default PeopleStore;
