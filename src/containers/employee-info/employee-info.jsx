import React, { Component } from "react";
import { connect } from "react-redux";

class EmployeeInfo extends Component {
  emplyeeInfo() {}
  render() {
    return <div>Employee Info</div>;
  }
}

export default connect((state) => ({}), {})(EmployeeInfo);
