import React from 'react';

import Dialog from './Dialog';

describe('<Dialog />', () => {
  describe('When options are filled', () => {
    const options = {
      open: true,
      onClose: () => {},
      title: 'title',
      content: (<div />),
      leftButtonOnClick: () => {},
      leftButtonAction: false,
      leftButtonLabel: 'test',
      disabled: false,
      rightButtonOnClick: () => {},
      rightButtonLabel: 'test',
      rightButtonAction: true
    };
  
    const dialog = shallow(<Dialog options={options} />);
  
    it('the dialog opens as expected', () => {
      expect(dialog).toMatchSnapshot();
    });
  });
});
