import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/actions';
import UserList from '../../components/user-list/user_list';

class Employee extends Component {
  // on init
  componentDidMount() {
    this.props.getUserList('employer');
  }

  render() {
    return (
      <div>
        <UserList userList={this.props.userList} />
      </div>
    );
  }
}

export default connect((state) => ({ userList: state.userList }), { getUserList })(Employee);
