import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import './spinner.css';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 6,
  },
});

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <div className={`spinnerEdit ${props.bgColor}`}>
      <CircularProgress
        className={classes.progress}
        style={{ color: props.color }}
        thickness={6}
        size={100}
      />
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);
