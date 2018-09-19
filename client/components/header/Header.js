import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';

import DialogSurvivor from './Dialog-survivor';
import Notifier from '../notifier/Notifier';
import { handleSavePerson } from '../../state/header/Header';
import fieldsData from '../../helpers/form-fields';

const { survivorFields } = fieldsData;
const plugins = { dvr: validatorjs };

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  }
});

@observer class Header extends Component {
  componentDidMount() {
    this.form = new MobxReactForm({ fields: survivorFields }, { plugins, hooks: this.hooks });
  }
  
  handleCloseDialogSurvivor = () => {
    this.openDialogSurvivor = false;
  };
  
  handleClickOpenDialogSurvivor = () => {
    this.openDialogSurvivor = true;
  };
  
  @observable openDialogSurvivor = false;
  @observable form = null;
  @observable notifier = null;
  
  render() {
    const { classes, store } = this.props;
    const options = {
      form: this.form,
      store,
      notifier: this.notifier,
      handleCloseDialogSurvivor: this.handleCloseDialogSurvivor
    };
    
    return (
      <Grid
        container
        spacing={16}
        justify="space-around"
        alignItems="center"
        className={classes.root}
      >
        <Notifier innerRef={(notifier) => {
          if (!this.notifier) {
            this.notifier = notifier;
          }
        }}
        />
        
        <DialogSurvivor
          open={this.openDialogSurvivor}
          handleCloseDialogSurvivor={this.handleCloseDialogSurvivor}
          options={options}
          fields={survivorFields}
          handleSurvivorPerson={() => handleSavePerson(options)}
        />
        
        <Grid item>
          <Typography
            variant="display2"
            align="center"
          >
            Survivor's list
          </Typography>
        </Grid>
    
        <Grid item>
          <Button
            variant="extendedFab"
            color="primary"
            component="span"
            onClick={this.handleClickOpenDialogSurvivor}
          >
            <AddIcon className={classes.leftIcon} />
            Add survivors
          </Button>
        </Grid>
      </Grid>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.shape({
    leftIcon: PropTypes.string.isRequired,
    root: PropTypes.string.isRequired
  }).isRequired,
  store: PropTypes.shape({
    peopleStore: PropTypes.shape({
      fetchingData: PropTypes.bool.isRequired,
      people: PropTypes.array.isRequired,
      person: PropTypes.object.isRequired,
      savingData: PropTypes.bool.isRequired,
    })
  }).isRequired
};

export default inject('store')(observer(withStyles(styles)(Header)));
