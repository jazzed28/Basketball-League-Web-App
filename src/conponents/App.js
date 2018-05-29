import React, { Component, Fragment } from 'react';
import CSSBaseline from '@material-ui/core/CssBaseline';
import { Header, Footer, Pages } from './layouts';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

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
});

export default class extends Component {
  render(){
    return (
      <Fragment>
        <CSSBaseline />
        <MuiThemeProvider theme={theme}>
          <Header/>
          <Switch>
            <Route path='/league' component={Pages} />
            <Route path='/contact' />
            <Route exact path='/' render={() => <Redirect to='/league' />} />
          </Switch>
          <Footer/>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}