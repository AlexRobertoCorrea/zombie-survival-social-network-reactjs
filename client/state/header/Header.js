import httpStatus from 'http-status';

const validateForm = async (form) => {
  const { isValid } = await form.validate({ showErrors: true });
  
  return isValid;
};

const fetchData = async (store) => {
  await store.peopleStore.fetchPeople();
};

const savePersonData = async (person, store) => await store.peopleStore.createPerson(person);

const successSave = async (status, person, store, notifier) => {
  if (status === httpStatus.CREATED) {
    notifier.update({
      message: `${person.name} was created successfully`,
      variant: 'success'
    });
  }
  
  return await fetchData(store);
};

const errorSave = (notifier, person, status) => {
  if (status === httpStatus.UNPROCESSABLE_ENTITY) {
    notifier.update({
      message: `${person.name} was already created`,
      variant: 'info'
    });
  } else {
    notifier.update({
      message: `Error on saving ${person.name}. Contact the administrator for more information.`,
      variant: 'error'
    });
  }
};

const saveData = async (person, store, notifier) => {
  try {
    const { status } = await savePersonData(person, store);
    
    return await successSave(status, person, store, notifier);
  } catch (err) {
    const status = err.response.status;
    
    errorSave(notifier, person, status);
  
    return status;
  }
};

const getItems = (person) => {
  let items = '';
  
  if (person.water) {
    items += `Water:${person.water};`;
  }
  
  if (person.food) {
    items += `Food:${person.food};`;
  }
  
  if (person.medication) {
    items += `Medication:${person.medication};`;
  }
  
  if (person.ammunition) {
    items += `Ammunition:${person.ammunition}`;
  }
  
  return items;
};

const getLonlat = person => `Point(${person.latitude} ${person.longitude})`;

const excludePersonValues = (person) => {
  delete person.latitude;
  delete person.longitude;
  delete person.water;
  delete person.food;
  delete person.medication;
  delete person.ammunition;
  
  return person;
};

const getPersonData = (form) => {
  const person = form.values();
  
  person.items = getItems(person);
  person.lonlat = getLonlat(person);
  person.age = Number(person.age);
  
  return excludePersonValues(person);
};

const handleSavePerson = async ({
  form,
  store,
  notifier,
  handleCloseDialogSurvivor
}) => {
  const isValid = await validateForm(form);

  if (isValid) {
    handleCloseDialogSurvivor();

    const person = getPersonData(form);

    return await saveData(person, store, notifier, handleCloseDialogSurvivor);
  }
};

export {
  handleSavePerson
};
