import React from 'react';

import Header from './Header';

describe('<Header />', () => {
  const classes = {
    root: '',
    leftIcon: ''
  };
  const store = {};
  const header = shallow(<Header classes={classes} store={store} />);
  
  it('renders the header as expected', () => {
    expect(header).toMatchSnapshot();
  });
});
