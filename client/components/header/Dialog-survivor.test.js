import React from 'react';

import DialogSurvivor from './Dialog-survivor';

describe('<DialogSurvivor />', () => {
  const open = true;
  const handleCloseDialogSurvivor = () => {};
  const handleSurvivorPerson = () => {};
  const options = {
    form: {},
    handleCloseDialogSurvivor,
    notifier: {},
    store: {
      peopleStore: {
        fetchingData: false,
        people: [],
        person: {},
        savingData: false
      }
    }
  };
  const fields = {
    name: {},
    age: {},
    gender: {},
    latitude: {},
    longitude: {},
    water: {},
    food: {},
    medication: {},
    ammunition: {}
  };
  
  const dialogSurvivor = shallow(<DialogSurvivor
    open={open}
    handleCloseDialogSurvivor={handleCloseDialogSurvivor}
    handleSurvivorPerson={handleSurvivorPerson}
    options={options}
    fields={fields}
  />);
  
  it('renders the dialogSurvivor as expected', () => {
    expect(dialogSurvivor).toMatchSnapshot();
  });
});
