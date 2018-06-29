import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import LockOutline from "@material-ui/icons/LockOutline";
import { Card, CardActions, CardContent } from '@material-ui/core';
import { FormControl, InputLabel, Input, InputAdornment, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import loginStyle from '../../../assets/jss/loginStyle';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      redirectTo: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("handleSubmit");

    axios.post('/user/login', {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    })
    .then(response => {
      console.log("login response: ");
      console.log(response);
      if(response.status === 200){
        // update App.js state
        // this.props.updateUser({
        //   loggedIn: true,
        //   username: response.data.username
        // })
        localStorage.setItem('usernmae', response.data.username);
        localStorage.setItem('jwtToken', response.data.token);
        // update the state to redirect to home
        this.setState({
          redirectTo: '/'
        })
      }
    }).catch(err => {
      console.log("login error: ");
      console.log(err);
    })
  }

  render(){
    const { classes, ...rest } = this.props;

    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <Fragment>
          <div className={classes.root}>
            <div className={classes.container}>
              <Grid container spacing={24} justify="center">
                <Grid item xs={12} sm={12} md={4}>
                  {/* <Paper className={classes.paper}>xs=12</Paper> */}
                  <Card className={classes.card}>
                    <form className={classes.form}>
                      <div className={classes.cardHeader}>
                        <h4 className={classes.title}>You in?</h4>
                      </div>
                      <p className={classes.divider}>League management</p>
                      <CardContent className={classes.cardContent}>
                        <FormControl fullWidth className={classes.formControl}>
                          <InputLabel htmlFor="adornment-email">Email</InputLabel>
                          <Input
                            id="adornment-email"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            endAdornment={<InputAdornment position="end"><Email /></InputAdornment>}
                          />
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                          <InputLabel htmlFor="adornment-password">Password</InputLabel>
                          <Input
                            id="adornment-password"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            endAdornment={<InputAdornment position="end"><LockOutline /></InputAdornment>}
                          />
                        </FormControl>
                      </CardContent>
                      <CardActions className={classes.cardActions}>
                        <Button 
                          variant="outlined" 
                          color="primary" 
                          size="large"
                          onClick={this.handleSubmit}>
                          Login
                        </Button>
                      </CardActions>
                    </form>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </div>
        </Fragment>
      )
    }         
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(loginStyle)(Login);