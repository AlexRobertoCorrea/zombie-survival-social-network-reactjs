import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

@observer class InputForm extends Component {
  getErrors = (errorMessage, showError) => {
    if (showError) {
      return (
        <FormHelperText id="name-error-text">{errorMessage}</FormHelperText>
      );
    }
    
    return <div />;
  };
  
  handleChange = (form, name) => (event) => {
    form.$(name).value = event.target.value;
  };
  
  input = (form, field, options) => (
    <Input
      id="margin-normal"
      value={form.$(field.id).value}
      onChange={form.$(field.id).onChange}
      inputProps={options}
      type={field.type}
    />
  );
  
  selectInput = (form, field, selectOptions) => (
    <React.Fragment>
      <Select
        value={form.$(field.id).value}
        onChange={this.handleChange(form, field.id)}
        inputProps={{
          name: field.label,
          id: form.$(field.id).id,
        }}
      >
        {selectOptions.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{field.helperText}</FormHelperText>
    </React.Fragment>
  );
  
  render() {
    const {
      form,
      field,
      maxLength,
      selectOptions
    } = this.props;
    
    const options = { maxLength };
    
    if (field.type === 'number') {
      options.min = 0;
    }
    
    return (
      <FormControl
        key={form.$(field.id).id}
        margin="dense"
        error={!!form.errors()[field.id]}
        required={field.required}
        disabled={field.disabled}
        fullWidth
      >
        <InputLabel>
          {field.label}
        </InputLabel>
        {selectOptions && selectOptions.length ?
          this.selectInput(form, field, selectOptions) :
          this.input(form, field, options)}
        {this.getErrors(field.errorMessage, !!form.errors()[field.id])}
      </FormControl>
    );
  }
}

InputForm.propTypes = {
  field: PropTypes.shape({
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    rules: PropTypes.string.isRequired,
    errorMessage: PropTypes.string,
    helperText: PropTypes.string,
    required: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  form: PropTypes.object.isRequired,
  maxLength: PropTypes.number.isRequired,
  selectOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }))
};

InputForm.defaultProps = {
  selectOptions: []
};

export default InputForm;
