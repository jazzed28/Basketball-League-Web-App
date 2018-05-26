import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
};

function Header(props) {
  const { classes } = props;
  return(
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Title
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withStyles(styles)(Header);