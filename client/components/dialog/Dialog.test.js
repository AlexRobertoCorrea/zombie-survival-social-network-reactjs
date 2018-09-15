import React from 'react';

import Dialog from './Dialog';

describe('<Dialog />', () => {
  describe('Render', () => {
    describe('When options are filled, a dialog opens', () => {
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
    
      it('Ensure that dialog works as expected', () => {
        expect(dialog).toMatchSnapshot();
      });
    });
  });
});
