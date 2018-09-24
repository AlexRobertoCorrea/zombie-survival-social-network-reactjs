import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import InputForm from '../input-form/Input-form';

const maxLengthInput = 50;

@observer class FormPerson extends Component {
  render() {
    const {
      handleSurvivorPerson,
      options,
      fields,
      gendersOptions
    } = this.props;
    
    return (
      <form onSubmit={() => handleSurvivorPerson(options)}>
        <React.Fragment>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <InputForm
                form={options.form}
                field={fields.name}
                maxLength={maxLengthInput}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <InputForm
                form={options.form}
                field={fields.age}
                maxLength={maxLengthInput}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <InputForm
                form={options.form}
                field={fields.gender}
                maxLength={maxLengthInput}
                selectOptions={gendersOptions}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputForm
                form={options.form}
                field={fields.latitude}
                maxLength={maxLengthInput}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputForm
                form={options.form}
                field={fields.longitude}
                maxLength={maxLengthInput}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subheading" gutterBottom>
                Items
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <InputForm
                form={options.form}
                field={fields.water}
                maxLength={maxLengthInput}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <InputForm
                form={options.form}
                field={fields.food}
                maxLength={maxLengthInput}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <InputForm
                form={options.form}
                field={fields.medication}
                maxLength={maxLengthInput}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <InputForm
                form={options.form}
                field={fields.ammunition}
                maxLength={maxLengthInput}
              />
            </Grid>
          </Grid>
        </React.Fragment>
      </form>
    );
  }
}

FormPerson.propTypes = {
  handleSurvivorPerson: PropTypes.func.isRequired,
  options: PropTypes.shape({
    form: PropTypes.object.isRequired,
    handleCloseDialogSurvivor: PropTypes.func.isRequired,
    notifier: PropTypes.object.isRequired,
    store: PropTypes.shape({
      peopleStore: PropTypes.shape({
        fetchingData: PropTypes.bool.isRequired,
        people: PropTypes.array.isRequired,
        person: PropTypes.object.isRequired,
        savingData: PropTypes.bool.isRequired,
      })
    }).isRequired
  }).isRequired,
  fields: PropTypes.shape({
    name: PropTypes.object.isRequired,
    age: PropTypes.object.isRequired,
    gender: PropTypes.object.isRequired,
    latitude: PropTypes.object.isRequired,
    longitude: PropTypes.object.isRequired,
    water: PropTypes.object.isRequired,
    food: PropTypes.object.isRequired,
    medication: PropTypes.object.isRequired,
    ammunition: PropTypes.object.isRequired,
  }).isRequired,
  gendersOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired
};

export default FormPerson;
