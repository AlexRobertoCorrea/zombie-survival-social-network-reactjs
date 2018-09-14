import React from 'react';

import ListData from './List-data';

describe('<ListData />', () => {
  describe('Renders people data correctly', () => {
    const classes = {
      cell: 'test',
      button: 'test'
    };
    const people = [{
      name: '',
      age: 16,
      gender: 'M',
      infected: null
    }];
    const handleClickOpenInfectDialog = () => {};
    
    const listData = shallow(<ListData
      classes={classes}
      people={people}
      handleClickOpenInfectDialog={handleClickOpenInfectDialog}
    />);
    
    it('Ensure that listData works as expected', () => {
      expect(listData).toMatchSnapshot();
    });
  });
});
