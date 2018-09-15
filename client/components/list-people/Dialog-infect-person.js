import React from 'react';
import PropTypes from 'prop-types';
import DialogContentText from '@material-ui/core/DialogContentText';

import Dialog from '../../components/dialog/Dialog';

const getContentDialog = person => (
  <DialogContentText id="alert-dialog-description">
    Are you sure you want mark {person.name} as infected?
  </DialogContentText>
);

const DialogInfectPerson = ({
  open,
  person,
  handleCloseInfect,
  handleInfectPerson
}) => {
  const title = 'Infect person';
  
  const options = {
    open,
    onClose: handleCloseInfect,
    title,
    content: getContentDialog(person),
    rightButtonLabel: 'Accept',
    rightButtonOnClick: handleInfectPerson,
    leftButtonLabel: 'Cancel',
    leftButtonOnClick: handleCloseInfect
  };
  
  return (
    <Dialog options={options} />
  );
};

DialogInfectPerson.propTypes = {
  open: PropTypes.bool.isRequired,
  person: PropTypes.shape({
    location: PropTypes.string,
    name: PropTypes.string,
    age: PropTypes.number,
    gender: PropTypes.string,
    lonlat: PropTypes.string,
    created_at: PropTypes.date,
    updated_at: PropTypes.date,
    infected: PropTypes.bool
  }).isRequired,
  handleCloseInfect: PropTypes.func.isRequired,
  handleInfectPerson: PropTypes.func.isRequired
};

DialogInfectPerson.defaultProps = {
  person: {
    location: '',
    name: '',
    age: 0,
    gender: 'M',
    lonlat: '',
    created_at: new Date(),
    updated_at: new Date(),
    infected: false
  }
};


export default DialogInfectPerson;
