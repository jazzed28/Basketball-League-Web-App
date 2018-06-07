import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import LockOutline from "@material-ui/icons/LockOutline";
import People from "@material-ui/icons/People";
import { Card, CardActions, CardContent } from '@material-ui/core';
import { TextField, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
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
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  card: {
    minWidth: 320,
    marginTop: "40px",
  },
  form: {
    margin: "0"
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    textAlign: "center"
  },
  pos: {
    marginBottom: 12,
  },
  divider: {
    marginTop: "30px",
    marginBottom: "0px",
    textAlign: "center"
  },
});
class Login extends Component {
  constructor(props){
    super(props);
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
        this.props.updateUser({
          loggedIn: true,
          username: response.data.username
        })
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
                      <h4 className={classes.title}>MEMBER ADMIN</h4>
                      <p className={classes.divider}>Or Be Classical</p>
                      <CardContent>
                        <Grid container spacing={8} alignItems="flex-end">
                          <Grid item>
                            <People />
                          </Grid>
                          <Grid item>
                            <TextField id="input-with-icon-grid" label="With a grid" />
                          </Grid>
                        </Grid>
                        
                        <Typography className={classes.pos} color="textSecondary">
                          adjective
                        </Typography>
                        <Typography component="p">
                          well meaning and kindly.<br />
                          {'"a benevolent smile"'}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button color="primary" size="large">
                          Login
                        </Button>
                      </CardActions>
                    </form>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </div>
          <h4>Login</h4>
          <form className="form-horizontal">
            <div className="form-group">
                <div className="col-1 col-ml-auto">
                    <label className="form-label" htmlFor="username">Username</label>
                </div>
                <div className="col-3 col-mr-auto">
                    <input className="form-input"
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
            <div className="form-group">
                <div className="col-1 col-ml-auto">
                    <label className="form-label" htmlFor="password">Password: </label>
                </div>
                <div className="col-3 col-mr-auto">
                    <input className="form-input"
                        placeholder="password"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
            <div className="form-group ">
                <div className="col-7"></div>
                <button
                    className="btn btn-primary col-1 col-mr-auto"
                  
                    onClick={this.handleSubmit}
                    type="submit">Login</button>
            </div>
          </form>
        </Fragment>
      )
    }         
  }
}

export default withStyles(styles)(Login);