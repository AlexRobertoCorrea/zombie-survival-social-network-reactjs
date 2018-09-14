import React from 'react';

import DialogInfectPerson from './Dialog-infect-person';

describe('<DialogInfectPerson />', () => {
  describe('Renders infected dialog correctly', () => {
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
    
    it('Ensure that dialogInfectPerson works as expected', () => {
      expect(dialogInfectPerson).toMatchSnapshot();
    });
  });
});
