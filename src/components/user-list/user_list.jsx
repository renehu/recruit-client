import React from 'react';
import PropTypes from 'prop-types';
import { WingBlank, WhiteSpace, Card } from 'antd-mobile';
const Header = Card.Header;
const Body = Card.Body;

export default class UserList extends React.Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  };

  render() {
    const { userList } = this.props;

    return (
      <WingBlank>
        {userList.map((user) => (
          <div key={user._id}>
            <WhiteSpace />
            <Card>
              <Header
                thumb={require(`../../assets/images/${user.avatar}.jpg`)}
                extra={user.username}
              />
              <Body>
                <div>Job title: {user.position}</div>
                {user.company ? <div>Company: {user.company}</div> : null}
                {user.salary ? <div>Salary: {user.salary}</div> : null}
                <div>Description: {user.info}</div>
              </Body>
            </Card>
          </div>
        ))}
      </WingBlank>
    );
  }
}
