import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

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
  render() {
    const { classes } = this.props;
    
    return (
      <Grid
        container
        spacing={16}
        justify="space-around"
        alignItems="center"
        className={classes.root}
      >
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
  classes: PropTypes.object.isRequired
};


export default observer(withStyles(styles)(Header));
