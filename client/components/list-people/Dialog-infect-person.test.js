import React from 'react';

import DialogInfectPerson from './Dialog-infect-person';

describe('<DialogInfectPerson />', () => {
  describe('When infected dialog is active', () => {
    const open = true;
    const person = {};
    const handleCloseInfect = () => {};
    const handleInfectPerson = () => {};
    
    const dialogInfectPerson = shallow(<DialogInfectPerson
      open={open}
      person={person}
      handleCloseInfect={handleCloseInfect}
      handleInfectPerson={handleInfectPerson}
    />);
    
    it('renders dialogInfectPerson correctly', () => {
      expect(dialogInfectPerson).toMatchSnapshot();
    });
  });
});
