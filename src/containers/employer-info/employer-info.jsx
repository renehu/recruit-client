import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";

import AvatarSelect from "../../components/avatar-select/avatar-select";

class EmployerInfo extends Component {
  emplyerInfo() {}
  render() {
    return (
      <div>
        <NavBar>Employer Info</NavBar>
        <AvatarSelect />
        <InputItem>Position:</InputItem>
        <InputItem>Company:</InputItem>
        <InputItem>Salary:</InputItem>
        <TextareaItem title="Qualifications" rows={5}></TextareaItem>
        <Button type="primary">Submit</Button>
      </div>
    );
  }
}

export default connect((state) => ({}), {})(EmployerInfo);
