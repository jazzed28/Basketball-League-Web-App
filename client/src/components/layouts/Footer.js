import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const styles = (theme) => {
  console.log(theme);
  return {
    container: {
      paddingRight: "15px",
      paddingLeft: "15px",
      marginRight: "auto",
      marginLeft: "auto",
      width: "100%",
      "@media (min-width: 576px)": {
        maxWidth: "540px"
      },
      "@media (min-width: 768px)": {
        maxWidth: "720px"
      },
      "@media (min-width: 992px)": {
        maxWidth: "960px"
      },
      "@media (min-width: 1200px)": {
        maxWidth: "1140px"
      }
    },
    toolbar: {
      backgroundColor: theme.palette.primary.main,
      boxShadow: "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"
    },
    center: {
      textAlign: 'center',
      color: '#fff'
    }
}
};

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

export default withStyles(styles)(Footer);