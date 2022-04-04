// login router component
import React, { Component } from "react";
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button,
} from "antd-mobile";

import Logo from "../../components/logo/logo";

const ListItem = List.Item;

export default class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  login = () => {
    console.log(this.state);
  };

  handleChange = (item, value) => {
    this.setState({
      [item]: value,
    });
  };

  gotoRegister = () => {
    this.props.history.replace("/register");
  };

  render() {
    const msg = "";
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
            <Button type="primary" onClick={this.login}>
              Login
            </Button>
            <WhiteSpace />
            <Button onClick={this.gotoRegister}>Go to register</Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}
