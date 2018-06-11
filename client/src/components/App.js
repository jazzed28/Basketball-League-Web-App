import React, { Component, Fragment } from 'react';
import CSSBaseline from '@material-ui/core/CssBaseline';
import { Header, Footer, Pages } from './layouts';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';

import Signup from './auth/Signup';
import Login from './auth/Login';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffe54c',
      main: '#ffb300',
      dark: '#c68400',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: "Roboto"
  }
});

class App extends Component {
  constructor(){
    super();
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this);
    // this.componentDidMount = this.componentDidMount.bind(this); // ?
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount(){
    this.getUser();
  }

  updateUser(userObject){
    this.setState(userObject);
  }

  getUser(){
    axios.get('/user').then(response => {
      console.log('Get user response: ');
      console.log(response.data);
      if(response.data.user){
        console.log('Get User: There is a user saved in the server session: ');
        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }
  
  render(){
    return (
      <Fragment>
        <CSSBaseline />
        <MuiThemeProvider theme={theme}>
          <Header updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
          <Switch>
            <Route 
              path='/login' 
              render={() => <Login updateUser={this.updateUser} />} 
            />
            <Route 
              path='/signup' 
              render={() => <Signup signup={this.signup} />} 
            />
            <Route 
              path='/league' 
              component={Pages} 
            />
            <Route 
              path='/contact'
            />
            <Route 
              exact 
              path='/' 
              render={() => <Redirect to='/league' />} 
            />
          </Switch>
          <Footer/>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default App;