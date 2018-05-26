import React, { Component, Fragment } from 'react';
import CSSBaseline from '@material-ui/core/CssBaseline';
import { Header, Footer } from './layouts';

export default class extends Component {
  render(){
    return (
      <Fragment>
        <CSSBaseline />
        <Header/>
        <Footer/>
      </Fragment>
    );
  }
}