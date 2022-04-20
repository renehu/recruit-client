import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { Button } from 'antd-mobile';

class Employer extends Component {
  render() {
    return (
      <div>
        <h2>Employer Dashboard</h2>
      </div>
    );
  }
}

export default connect((state) => ({}), {})(Employer);
