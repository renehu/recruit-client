import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';

import AvatarSelect from '../../components/avatar-select/avatar-select';
import { updateUser } from '../../redux/actions';

class EmployerInfo extends Component {
  state = {
    avatar: '',
    position: '',
    company: '',
    salary: '',
    location: '',
    info: ''
  };

  setAvatar = (avatar) => {
    this.setState({
      avatar: avatar
    });
  };

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  save = () => {
    this.props.updateUser(this.state);
  };

  render() {
    // if employers have set avatar, redirect to employer page
    const { avatar, type } = this.props.user;
    if (avatar) {
      const url = type === 'employer' ? 'employer' : 'employee';
      return <Redirect to={url} />;
    }

    return (
      <div>
        <NavBar>Employer Info</NavBar>
        <AvatarSelect setAvatar={this.setAvatar} />
        <InputItem
          onChange={(val) => {
            this.handleChange('position', val);
          }}>
          Job title:
        </InputItem>
        <InputItem onChange={(val) => this.handleChange('company', val)}>Company:</InputItem>
        <InputItem onChange={(val) => this.handleChange('salary', val)}>Salary:</InputItem>
        <InputItem onChange={(val) => this.handleChange('location', val)}>Location:</InputItem>
        <TextareaItem
          title="Description:"
          rows={5}
          onChange={(val) => this.handleChange('info', val)}></TextareaItem>
        <Button type="primary" onClick={this.save}>
          Submit
        </Button>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }), { updateUser })(EmployerInfo);
