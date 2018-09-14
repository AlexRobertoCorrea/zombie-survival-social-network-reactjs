const getPersonId = (location) => {
  const uuidIndex = 1;
  const parser = 'http://zssn-backend-example.herokuapp.com/api/people/';
  
  return location.split(parser)[uuidIndex];
};

const setPeopleId = people => people.map((person) => {
  person.id = getPersonId(person.location);
  
  return person;
});

const fetchData = (store) => {
  store.peopleStore.fetchPeople();
};

export {
  fetchData,
  setPeopleId
};
