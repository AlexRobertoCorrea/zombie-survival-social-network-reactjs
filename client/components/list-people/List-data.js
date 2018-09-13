import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import AddAlarm from '@material-ui/icons/AddAlarm';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import uuid from 'uuid/v4';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  cell: {
    borderBottom: 0
  }
});

const markInfectedButton = (person, classes) => {
  const infectedMessage = `${person.name} will be marked as infected`;
  
  return (
    <Tooltip title={infectedMessage} placement="top">
      <Button
        variant="fab"
        color="secondary"
        aria-label="Delete"
        className={classes.button}
        disabled={person.infected}
      >
        <AddAlarm />
      </Button>
    </Tooltip>
  );
};

@observer class ListData extends Component {
  render() {
    const { classes, people } = this.props;
    
    return people.map((person) => {
      const infectedStatus = person.infected ? 'Infected' : 'Normal';
      const key = uuid();
      
      return (
        <TableRow key={key}>
          <TableCell className={classes.cell}>
            {person.name}
          </TableCell>
          <TableCell className={classes.cell}>
            {person.age}
          </TableCell>
          <TableCell className={classes.cell}>
            {person.gender}
          </TableCell>
          <TableCell className={classes.cell}>
            {infectedStatus}
          </TableCell>
          <TableCell className={classes.cell}>
            {markInfectedButton(person, classes)}
          </TableCell>
        </TableRow>
      );
    });
  }
}

ListData.propTypes = {
  people: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default observer(withStyles(styles)(ListData));
