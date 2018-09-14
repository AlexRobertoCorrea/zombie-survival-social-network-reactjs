import { types, flow } from 'mobx-state-tree';

import { fetchPeopleApi, markPersonInfectedApi } from '../services/people';

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

const PeopleStore = types
  .model('PeopleStore', {
    people: types.optional(types.array(PersonModel), []),
    fetchingData: types.optional(types.boolean, false),
    savingData: types.optional(types.boolean, false)
  })
  .actions((self) => {
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
    
    return { fetchPeople, markPersonAsInfected };
  });

export default PeopleStore;
