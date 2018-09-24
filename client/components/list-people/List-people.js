import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

import ListData from './List-data';
import DialogInfectPerson from './Dialog-infect-person';
import Notifier from '../notifier/Notifier';
import {
  fetchData,
  setPeopleId,
  handleInfectPerson,
  getInfectOptions
} from '../../state/list-people/List-people';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  }
});

@observer class ListPeople extends Component {
  componentDidMount() {
    const { store } = this.props;
    
    fetchData(store);
  }
  
  handleCloseInfectDialog = () => {
    this.openInfectDialog = false;
  };
  
  handleClickOpenInfectDialog = (person) => {
    this.openInfectDialog = true;
    this.person = person;
  };
  
  @observable openInfectDialog = false;
  @observable notifier = null;
  @observable person = {};
  
  render() {
    const { classes, store } = this.props;
  
    if (store.peopleStore.fetchingData || !store.peopleStore.people.length) {
      return (
        <div>
          <Grid container justify="center">
            <CircularProgress size={50} />
          </Grid>
        </div>
      );
    }
  
    const people = setPeopleId(store.peopleStore.people);
    
    return (
      <div className={classes.root}>
        <Notifier innerRef={(notifier) => {
          if (!this.notifier) {
            this.notifier = notifier;
          }
        }}
        />
        
        <DialogInfectPerson
          open={this.openInfectDialog}
          person={this.person}
          handleCloseInfect={this.handleCloseInfectDialog}
          handleInfectPerson={() => {
            handleInfectPerson(getInfectOptions(this.person, people, store, this.notifier));
            this.handleCloseInfectDialog();
          }}
        />
        
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Mark as infected</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <ListData
              people={people}
              handleClickOpenInfectDialog={this.handleClickOpenInfectDialog}
            />
          </TableBody>
        </Table>
      </div>
    );
  }
}

ListPeople.propTypes = {
  store: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default inject('store')(observer(withStyles(styles)(ListPeople)));
