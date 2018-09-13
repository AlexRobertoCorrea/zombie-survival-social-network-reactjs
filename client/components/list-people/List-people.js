import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

import ListData from './List-data';
import { fetchData } from '../../state/list-people/List-people';

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
  
  render() {
    const { classes, store } = this.props;
  
    if (store.peopleStore.fetchingData) {
      return (
        <div>
          <Grid container justify="center">
            <CircularProgress size={50} />
          </Grid>
        </div>
      );
    }
    
    return (
      <div className={classes.root}>
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
              people={store.peopleStore.people}
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
