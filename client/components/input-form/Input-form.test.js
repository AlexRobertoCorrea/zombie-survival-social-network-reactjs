import React from 'react';

import InputForm from './Input-form';

describe('When selectOptions is passed at props', () => {
  const field = {
    label: '',
    id: '',
    rules: '',
    errorMessage: '',
    helperText: '',
    required: false,
    type: '',
  };
  const maxLength = 50;
  const selectOptions = [{
    label: '',
    value: ''
  }];
  const form = {
    $: () => ({
      ...field
    }),
    errors: () => ({ [field.id]: '' })
  };
  
  const inputForm = shallow(<InputForm
    form={form}
    field={field}
    maxLength={maxLength}
    selectOptions={selectOptions}
  />);
  
  it('renders the inputForm as expected', () => {
    expect(inputForm).toMatchSnapshot();
  });
});

describe('When selectOptions is not passed at props', () => {
  const field = {
    label: '',
    id: '',
    rules: '',
    errorMessage: '',
    helperText: '',
    required: false,
    type: '',
  };
  const maxLength = 50;
  const form = {
    $: () => ({
      ...field
    }),
    errors: () => ({ [field.id]: '' })
  };
  
  const inputForm = shallow(<InputForm
    form={form}
    field={field}
    maxLength={maxLength}
  />);
  
  it('renders the inputForm as expected', () => {
    expect(inputForm).toMatchSnapshot();
  });
});
