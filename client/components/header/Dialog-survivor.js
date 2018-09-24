import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import Dialog from '../../components/dialog/Dialog';
import FormPerson from './Form-person';

@observer class DialogSurvivor extends Component {
  dialogContent = () => {
    const {
      options,
      handleSurvivorPerson,
      fields
    } = this.props;
  
    const gendersOptions = [
      {
        value: 'M',
        label: 'Male',
      },
      {
        value: 'F',
        label: 'Female',
      }
    ];
    
    if (options.form) {
      return (
        <FormPerson
          form={options.form}
          handleSurvivorPerson={handleSurvivorPerson}
          options={options}
          fields={fields}
          gendersOptions={gendersOptions}
        />
      );
    }
  };
  
  render() {
    const { open, handleCloseDialogSurvivor, handleSurvivorPerson } = this.props;
  
    const title = 'Register user';
  
    const options = {
      open,
      onClose: handleCloseDialogSurvivor,
      title,
      content: this.dialogContent(),
      rightButtonLabel: 'Save',
      rightButtonOnClick: handleSurvivorPerson,
      leftButtonLabel: 'Cancel',
      leftButtonOnClick: handleCloseDialogSurvivor
    };
  
    return (
      <Dialog options={options} />
    );
  }
}

DialogSurvivor.propTypes = {
  open: PropTypes.bool.isRequired,
  handleCloseDialogSurvivor: PropTypes.func.isRequired,
  handleSurvivorPerson: PropTypes.func.isRequired,
  options: PropTypes.shape({
    form: PropTypes.object,
    handleCloseDialogSurvivor: PropTypes.func.isRequired,
    notifier: PropTypes.object,
    store: PropTypes.shape({
      peopleStore: PropTypes.shape({
        fetchingData: PropTypes.bool.isRequired,
        people: PropTypes.array.isRequired,
        person: PropTypes.object.isRequired,
        savingData: PropTypes.bool.isRequired
      })
    }).isRequired
  }),
  fields: PropTypes.shape({
    name: PropTypes.object,
    age: PropTypes.object,
    gender: PropTypes.object,
    latitude: PropTypes.object,
    longitude: PropTypes.object,
    water: PropTypes.object,
    food: PropTypes.object,
    medication: PropTypes.object,
    ammunition: PropTypes.object
  }).isRequired
};

DialogSurvivor.defaultProps = {
  options: {
    form: {}
  }
};

export default DialogSurvivor;
