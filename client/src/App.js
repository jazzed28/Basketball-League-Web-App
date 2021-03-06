import React, { Component, Fragment } from 'react';
import CSSBaseline from '@material-ui/core/CssBaseline';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';

import { Header, Footer, Home, Roster } from './components/views';
import Signup from './components/views/auth/Signup';
import Login from './components/views/auth/Login';
import PrivateRoute from './routes/PrivateRoute';

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
      contrastText: '#fff',
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
    // this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount(){
    this.getUser();
  }

  // updateUser(userObject){
  //   this.setState(userObject);
  // }

  getUser(){
    let jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      console.log('Get User: There is a username saved in the localStorage: ');
      this.setState({
        loggedIn: true,
        username: localStorage.getItem('username')
      })
    } else {
      console.log('Get user: no user');
      this.setState({
        loggedIn: false,
        username: null
      })
    }
    // axios.get('/user').then(response => {
    //   console.log('Get user response: ');
    //   console.log("get response", response.data);
    //   if(response.data.user){
    //     console.log('Get User: There is a user saved in the server session: ');
    //     this.setState({
    //       loggedIn: true,
    //       username: response.data.user.username
    //     })
    //   } else {
    //     console.log('Get user: no user');
    //     this.setState({
    //       loggedIn: false,
    //       username: null
    //     })
    //   }
    // })
  }
  
  render(){
    return (
      <Fragment>
        <CSSBaseline />
        <MuiThemeProvider theme={theme}>
          <Header />
          <Switch>
            <Route 
              exact
              path='/' 
              component={Home} 
            />
            <Route 
              path='/login' 
              render={() => <Login />} 
            />
            <Route 
              path='/signup' 
              render={() => <Signup signup={this.signup} />} 
            />
            <Route 
              path='/contact'
            />
            <PrivateRoute
              path='/roster'
              component={Roster}
            />
          </Switch>
          <Footer/>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

export default App;