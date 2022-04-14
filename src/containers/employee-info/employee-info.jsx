import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";
import { updateUser } from "../../redux/actions";

import AvatarSelect from "../../components/avatar-select/avatar-select";

class EmployeeInfo extends Component {
  state = {
    avatar: "",
    position: "",
    location: "",
    info: "",
  };

  setAvatar = (avatar) => {
    this.setState({
      avatar: avatar,
    });
  };

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  save = () => {
    this.props.updateUser(this.state);
  };

  render() {
    // if employees have set avatar, redirect to employee page
    const { avatar, type } = this.props.user;
    if (avatar) {
      const url = type === "employer" ? "employer" : "employee";
      return <Redirect to={url} />;
    }

    return (
      <div>
        <NavBar>Employee Info</NavBar>
        <AvatarSelect setAvatar={this.setAvatar} />
        <InputItem
          onChange={(val) => {
            this.handleChange("position", val);
          }}
        >
          Position:
        </InputItem>
        <InputItem onChange={(val) => this.handleChange("location", val)}>
          Location:
        </InputItem>
        <TextareaItem
          title="Bio:"
          rows={5}
          onChange={(val) => this.handleChange("info", val)}
        ></TextareaItem>
        <Button type="primary" onClick={this.save}>
          Submit
        </Button>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }), { updateUser })(
  EmployeeInfo
);
