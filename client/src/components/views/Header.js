import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, Hidden, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
import headerStyle from '../../assets/jss/headerStyle';

class Header extends Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      mobileOpen: false
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }
  handleDrawerToggle() {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }
  logout(event){
    event.preventDefault();
    console.log('logging out');
    axios.post('/user/logout')
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

    const rightlink = (
      <List className={classes.list}>
        <ListItem button className={classes.listItem}>
          <Link to='/#'><Button color="inherit">League</Button></Link>
        </ListItem>
        <ListItem button className={classes.listItem}>
          <Link to='/#'><Button color="inherit">Contact</Button></Link>
        </ListItem>
      </List>
    );

    return(
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Basketball
            </Typography>
            <Hidden smDown implementation="css">
              {rightlink}
            </Hidden>
            <Link to='#' onClick={this.logout}><Button color="inherit">Logout</Button></Link>
            <Link to='/login'><Button color="inherit">Login</Button></Link>
            <Link to='/signup'><Button color="inherit">Sign Up</Button></Link>
            <Hidden mdUp>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
              >
              <Menu />
              </IconButton>
            </Hidden>
            <Hidden mdUp implementation="css">
              <Drawer
                variant="temporary"
                anchor={"right"}
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
              >
                {rightlink}
              </Drawer>
            </Hidden>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func,
  handleDrawerToggle: PropTypes.func,
}

export default withStyles(headerStyle)(Header);