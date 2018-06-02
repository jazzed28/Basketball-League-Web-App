import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  list: {
    fontFamily: theme.typography.fontFamily,
    fontSize: "14px",
    margin: 0,
    paddingLeft: "0",
    listStyle: "none",
    paddingTop: "0",
    paddingBottom: "0",
    color: "inherit"
  },
  listItem: {
    float: "left",
    color: "inherit",
    position: "relative",
    display: "block",
    width: "auto",
    marginLeft: "15px",
    padding: "0",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      "&:after": {
        width: "calc(100% - 30px)",
        content: '""',
        display: "block",
        height: "1px",
        marginLeft: "15px",
        backgroundColor: "#e5e5e5"
      }
    }
  },
});

class Header extends Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(event){
    event.preventDefault();
    console.log('logging out');
    axios.post('http://localhost:3000/user/logout')
      .then(response => {
        console.log(response.data)
        if(response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            username: null
          })
        }
      })
      .catch(err => {
        console.log("Logout error", err);
      });
  }

  render(){
    const { classes } = this.props;
    const loggedIn = this.props.loggedIn;

    console.log('Header render, props: ');
    console.log(this.props);

    return(
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Basketball
            </Typography>
            <List className={classes.list}>
              <ListItem button className={classes.listItem}>
                <Link to='/league'><Button color="inherit">League</Button></Link>
              </ListItem>
              <ListItem button className={classes.listItem}>
                <Link to='/contact'><Button color="inherit">Contact</Button></Link>
              </ListItem>
            </List>
            <Link to='#' onClick={this.logout}><Button color="inherit">Logout</Button></Link>
            <Link to='/login'><Button color="inherit">Login</Button></Link>
            <Link to='/signup'><Button color="inherit">Sign Up</Button></Link>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
  
}

export default withStyles(styles)(Header);