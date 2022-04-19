import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Button } from 'antd-mobile';

class Employer extends Component {
  logout = () => {
    Cookies.remove('userid');
    this.props.history.replace('/login');
  };

  render() {
    return (
      <div>
        <h2>Employer Dashboard</h2>
        <br />
        <Button onClick={this.logout}>Logout</Button>
      </div>
    );
  }
}

export default connect((state) => ({}), {})(Employer);
