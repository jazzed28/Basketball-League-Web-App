import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';

const styles = {
  root: {
    width: 500,
  },
};

function Footer(props) {
  const { classes } = props;
  return(
    <div className={classes.root}>
        <Toolbar>
      
        </Toolbar>
    </div>
  )
}

export default withStyles(styles)(Footer);