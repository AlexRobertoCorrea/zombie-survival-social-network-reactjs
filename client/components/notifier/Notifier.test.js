import React from 'react';

import Notifier from './Notifier';

describe('<Notifier />', () => {
  describe('When open is false', () => {
    const classes = {
      message: 'success'
    };
  
    const wrapper = shallow(<Notifier classes={classes} />);
  
    wrapper.setState({
      open: false,
      message: 'message test',
      variant: 'success'
    });
    
    it('Notifier is rendered correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  
  describe('When open is true and success message', () => {
    const classes = {
      message: 'success',
      success: 'success'
    };
  
    const wrapper = shallow(<Notifier classes={classes} />);
    
    wrapper.setState({
      open: true,
      message: 'message test',
      variant: 'success'
    });

    it('Notifier is rendered with success message', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  
  describe('When open is true and error message', () => {
    const classes = {
      message: 'success',
      error: 'error'
    };
    
    const wrapper = shallow(<Notifier classes={classes} />);
    
    wrapper.setState({
      open: true,
      message: 'error message',
      variant: 'error'
    });
    
    it('Notifier is rendered correctly with error message', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
