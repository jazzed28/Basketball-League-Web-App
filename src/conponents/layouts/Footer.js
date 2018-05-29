import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';

const styles = (theme) => {
  console.log(theme);
  return {
  footer: {
    backgroundColor: theme.palette.primary.main,
    fontFamily: theme.typography.fontFamily,
    position: 'fixed',
    bottom: 0,
    width: '100%',
    height: '4.64rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  copyright: {
    textAlign: 'center',
    color: '#fff',
  }
}
};

function Footer(props) {
  const { classes } = props;
  return(
    <div className={classes.footer}>
      <p className={classes.copyright}>© 2018 BBALL LEAGUE All rights reserved.</p>
    </div>
  )
}

export default withStyles(styles)(Footer);