// register router component
import React, { Component } from "react";
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button,
} from "antd-mobile";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { register } from "../../redux/actions";

import Logo from "../../components/logo/logo";

const ListItem = List.Item;

class Register extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
    type: "employee",
  };

  register = () => {
    //console.log(this.state);
    this.props.register(this.state);
  };

  handleChange = (item, value) => {
    this.setState({
      [item]: value,
    });
  };

  gotoLogin = () => {
    this.props.history.replace("/login");
  };

  render() {
    const { type } = this.state;
    const { msg, redirectTo } = this.props.user;
    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }

    return (
      <div>
        <WingBlank>
          <NavBar>RECRUIT</NavBar>
          <WhiteSpace />
          <Logo />
          <WhiteSpace />
          {msg ? <p className="error-msg">{msg}</p> : null}
          <WhiteSpace />
          <List>
            <WhiteSpace />
            <InputItem
              onChange={(val) => {
                this.handleChange("username", val);
              }}
              placeholder="Please enter your username"
            >
              Username
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={(val) => {
                this.handleChange("password", val);
              }}
              placeholder="Please enter your password"
            >
              Password
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={(val) => {
                this.handleChange("confirmPassword", val);
              }}
              placeholder="Please confirm your password"
            >
              Confirm Password
            </InputItem>
            <WhiteSpace />
            <ListItem>
              <span>User Type</span>
              &nbsp;&nbsp;&nbsp;
              <Radio
                onChange={() => {
                  this.handleChange("type", "employee");
                }}
                checked={type === "employee"}
              >
                Employee
              </Radio>
              <Radio
                onChange={() => {
                  this.handleChange("type", "employer");
                }}
                checked={type === "employer"}
              >
                Employer
              </Radio>
            </ListItem>
            <WhiteSpace />
            <Button type="primary" onClick={this.register}>
              Register
            </Button>
            <WhiteSpace />
            <Button onClick={this.gotoLogin}>Already have an account</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }), { register })(
  Register
);
