import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import AddAlarm from '@material-ui/icons/AddAlarm';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  cell: {
    borderBottom: 0
  }
});

const markInfectedButton = (person, classes, handleClickOpenInfectDialog) => {
  const infectedMessage = `${person.name} will be marked as infected`;
  
  return (
    <Tooltip title={infectedMessage} placement="top">
      <Button
        variant="fab"
        color="secondary"
        aria-label="Delete"
        className={classes.button}
        disabled={person.infected}
        onClick={() => handleClickOpenInfectDialog(person)}
      >
        <AddAlarm />
      </Button>
    </Tooltip>
  );
};

@observer class ListData extends Component {
  render() {
    const { classes, people, handleClickOpenInfectDialog } = this.props;
    
    return people.map((person) => {
      const infectedStatus = person.infected ? 'Infected' : 'Normal';
      
      return (
        <TableRow key={person.id}>
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
            {markInfectedButton(person, classes, handleClickOpenInfectDialog)}
          </TableCell>
        </TableRow>
      );
    });
  }
}

ListData.propTypes = {
  people: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  handleClickOpenInfectDialog: PropTypes.func.isRequired
};

export default observer(withStyles(styles)(ListData));
