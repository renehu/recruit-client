import Cookies from 'js-cookie';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
export default class Employee extends Component {
  logout = () => {
    Cookies.remove('userid');
  };

  render() {
    return (
      <div>
        Employee Dashboard
        <br />
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}
