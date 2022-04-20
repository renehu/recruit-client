import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Button } from 'antd-mobile';

class Employee extends Component {
  render() {
    return (
      <div>
        <h2>Employee Dashboard</h2>
      </div>
    );
  }
}

export default connect((state) => ({}), {})(Employee);
