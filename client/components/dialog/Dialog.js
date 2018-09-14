import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const SimpleDialog = ({ options }) => {
  if (!options || !Object.keys(options).length) {
    return <div />;
  }
  
  const {
    open,
    onClose,
    title,
    content,
    leftButtonOnClick,
    leftButtonAction,
    leftButtonLabel,
    disabled,
    rightButtonOnClick,
    rightButtonLabel,
    rightButtonAction
  } = options;
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        {content}
      </DialogContent>
  
      <DialogActions>
        {leftButtonLabel &&
          <Button onClick={() => leftButtonOnClick(leftButtonAction)} color="primary">
            {leftButtonLabel}
          </Button>
        }
  
        {rightButtonLabel &&
          <label htmlFor="contained-button-file">
            <Button
              color="primary"
              disabled={disabled}
              onClick={() => rightButtonOnClick(rightButtonAction)}
            >
              {rightButtonLabel}
            </Button>
          </label>
        }
      </DialogActions>
    </Dialog>
  );
};

SimpleDialog.propTypes = {
  options: PropTypes.object.isRequired
};

export default SimpleDialog;
