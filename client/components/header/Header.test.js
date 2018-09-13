import React from 'react';

import Header from './Header';

describe('<Header />', () => {
  describe('Renders header correctly', () => {
    const header = shallow(<Header />);
    
    it('Ensure that header works correctly', () => {
      expect(header).toMatchSnapshot();
    });
  });
});
