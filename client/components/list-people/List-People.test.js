import React from 'react';

import ListPeople from './List-people';

describe('<ListPeople />', () => {
  describe('When people data is not loaded', () => {
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
    
    it('renders a circular progress', () => {
      expect(listPeople).toMatchSnapshot();
    });
  });
  
  describe('When people data is loaded', () => {
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
    
    it('renders a table of people', () => {
      expect(listPeople).toMatchSnapshot();
    });
  });
});
