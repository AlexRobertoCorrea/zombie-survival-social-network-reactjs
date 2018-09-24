import React from 'react';

import ListData from './List-data';

describe('<ListData />', () => {
  describe('When people data is loaded', () => {
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
    
    it('listData shows a list of people', () => {
      expect(listData).toMatchSnapshot();
    });
  });
});
