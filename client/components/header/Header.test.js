import React from 'react';

import Header from './Header';

describe('<Header />', () => {
  const header = shallow(<Header />);
  
  it('renders the header as expected', () => {
    expect(header).toMatchSnapshot();
  });
});
