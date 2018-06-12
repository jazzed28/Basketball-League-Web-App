import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Toolbar, Typography } from '@material-ui/core';
import footerStyle from '../../assets/jss/footerStyle';

function Footer(props) {
  const { classes } = props;
  return(
      <Toolbar className={classes.toolbar}>
        <footer className={classes.container}>
          <Typography variant="body1" className={classes.center} align="center">
            &copy; 2018 BBALL LEAGUE
          </Typography>
        </footer>
      </Toolbar>
  )
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(footerStyle)(Footer);