import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';

const styles = (theme) => {
  console.log(theme);
  const conatinerFluid = {
      paddingRight: "15px",
      paddingLeft: "15px",
      marginRight: "auto",
      marginLeft: "auto",
      width: "100%"
  };
  return {
    container: {
      ...conatinerFluid,
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
    footer: {
      backgroundColor: theme.palette.primary.main,
      fontFamily: theme.typography.fontFamily,
      position: "relative",
      bottom: 0,
      width: '100%',
      display: 'flex',
      boxShadow:
      "0 -4px 18px 0px rgba(0, 0, 0, 0.12), 0 -7px 10px -5px rgba(0, 0, 0, 0.15)",
      alignItems: 'center',
      justifyContent: 'center',
      padding: "0.9375rem 0",
      textAlign: "center",
      zIndex: "2"
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
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.center}>
          &copy; 2018 BBALL LEAGUE
        </div>
      </div>
    </footer>
  )
}

export default withStyles(styles)(Footer);