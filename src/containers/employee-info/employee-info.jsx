import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";

import AvatarSelect from "../../components/avatar-select/avatar-select";

class EmployeeInfo extends Component {
  emplyeeInfo() {}
  render() {
    return (
      <div>
        <NavBar>Employee Info</NavBar>
        <AvatarSelect />
        <InputItem>Position:</InputItem>
        <TextareaItem title="Bio" rows={5}></TextareaItem>
        <Button type="primary">Submit</Button>
      </div>
    );
  }
}

export default connect((state) => ({}), {})(EmployeeInfo);
