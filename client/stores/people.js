import axios from 'axios';
import { types, flow } from 'mobx-state-tree';

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
    fetchingData: types.optional(types.boolean, false)
  })
  .actions(self => {
    const fetchPeople = flow(function* () {
      self.fetchingData = true;
      const url = 'http://zssn-backend-example.herokuapp.com/api/people.json';
      
      const people = yield axios.get(url);
  
      self.people = people.data.map(person => ({
        location: person.location,
        name: person.name,
        age: person.age,
        gender: person.gender,
        lonlat: person.lonlat,
        created_at: new Date(person.created_at),
        updated_at: new Date(person.updated_at),
        infected: person['infected?']
      }));
  
      self.fetchingData = false;
    });
    
    return { fetchPeople };
  });

export default PeopleStore;