import React from 'react';

import ListPeople from './List-people';

describe('<ListPeople />', () => {
  describe('Renders a circular progress because people was not loaded', () => {
    const store = {
      peopleStore: {
        fetchingData: true
      }
    };
    const classes = {};
    
    const listPeople = shallow(<ListPeople
      store={store}
      classes={classes}
    />);
    
    it('Ensure that listPeople works as expected', () => {
      expect(listPeople).toMatchSnapshot();
    });
  });
  
  describe('Renders the table of people correctly', () => {
    const store = {
      peopleStore: {
        people: []
      },
      fetchingData: false
    };
    const classes = {
      root: '',
      table: ''
    };
  
    const listPeople = shallow(<ListPeople
      store={store}
      classes={classes}
    />);
    
    it('Ensure that listPeople works as expected', () => {
      expect(listPeople).toMatchSnapshot();
    });
  });
});
