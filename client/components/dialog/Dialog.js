import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const SimpleDialog = ({ options }) => {
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
  options: PropTypes.shape({
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
    leftButtonOnClick: PropTypes.func,
    leftButtonAction: PropTypes.bool,
    leftButtonLabel: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    rightButtonOnClick: PropTypes.func,
    rightButtonLabel: PropTypes.string.isRequired,
    rightButtonAction: PropTypes.bool
  })
};

SimpleDialog.defaultProps = {
  options: {
    leftButtonOnClick: () => {},
    leftButtonAction: false,
    disabled: false,
    rightButtonOnClick: () => {},
    rightButtonAction: false
  }
};

export default SimpleDialog;
