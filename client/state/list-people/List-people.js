import httpStatus from 'http-status';

const getPersonId = (location) => {
  const uuidIndex = 1;
  const parser = 'http://zssn-backend-example.herokuapp.com/api/people/';
  
  return location.split(parser)[uuidIndex];
};

const setPeopleId = people => people.map((person) => {
  person.id = getPersonId(person.location);
  
  return person;
});

const fetchData = async (store) => {
  await store.peopleStore.fetchPeople();
};

const successSave = async (status, person, store, notifier) => {
  if (status === httpStatus.ACCEPTED) {
    notifier.update({
      message: `${person.name} was marked as infected`,
      variant: 'success'
    });
  }
  
  return await fetchData(store);
};

const errorSave = (notifier, person) => {
  notifier.update({
    message: `Error on saving ${person.name}. Contact the administrator for more information.`,
    variant: 'error'
  });
};

const handleInfectPerson = async ({
  person,
  delator,
  store,
  notifier
}) => {
  try {
    const { status } = await store.peopleStore.markPersonAsInfected(person.id, delator.id);
    
    await successSave(status, person, store, notifier);
    
    return status;
  } catch (err) {
    const status = err.response.status;
    
    errorSave(notifier, person);
    
    return status;
  }
};

const getInfectOptions = (person, people, store, notifier) => {
  const delator = people.find(personData => personData.id !== person.id);
  
  return {
    person,
    delator,
    store,
    notifier
  };
};

export {
  fetchData,
  handleInfectPerson,
  setPeopleId,
  getInfectOptions
};
