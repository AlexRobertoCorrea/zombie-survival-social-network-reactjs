import React from 'react';

import FormPerson from './Form-person';

const getFieldData = () => ({
  label: '',
  id: '',
  rules: '',
  required: false,
  type: ''
});

describe('<FormPerson />', () => {
  const handleSurvivorPerson = () => {};
  const options = {
    form: {},
    handleCloseDialogSurvivor: () => {},
    notifier: {},
    store: {
      peopleStore: {
        fetchingData: false,
        people: [],
        person: {},
        savingData: false,
      }
    }
  };
  const fields = {
    name: getFieldData(),
    age: getFieldData(),
    gender: getFieldData(),
    latitude: getFieldData(),
    longitude: getFieldData(),
    water: getFieldData(),
    food: getFieldData(),
    medication: getFieldData(),
    ammunition: getFieldData()
  };
  const gendersOptions = [{
    label: '',
    value: ''
  }];
  
  const formPerson = shallow(<FormPerson
    handleSurvivorPerson={handleSurvivorPerson}
    options={options}
    fields={fields}
    gendersOptions={gendersOptions}
  />);
  
  it('renders the formPerson as expected', () => {
    expect(formPerson).toMatchSnapshot();
  });
});
