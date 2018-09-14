import Chance from 'chance';

const chance = new Chance();

const getPersonData = (data = {}) => ({
  location: data.location || chance.url(),
  name: data.name || chance.name(),
  age: data.age || chance.natural({ min: 1, max: 20 }),
  gender: data.gender || chance.gender(),
  lonlat: data.lonlat || chance.coordinates(),
  created_at: data.created_at || chance.birthday(),
  updated_at: data.updated_at || chance.birthday(),
  infected: chance.bool()
});

export { getPersonData };
