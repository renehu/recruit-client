import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Button } from 'antd-mobile';

class Employee extends Component {
  logout = () => {
    Cookies.remove('userid');
  };

  render() {
    return (
      <div>
        <h2>Employee Dashboard</h2>
        <br />
        <Button onClick={() => this.props.history.replace('/login')}>Logout</Button>
      </div>
    );
  }
}

export default connect((state) => ({}), {})(Employee);
