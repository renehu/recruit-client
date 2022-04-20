import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetUser } from '../../redux/actions';
import Cookies from 'js-cookie';
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class Profile extends Component {
  logout = () => {
    Modal.alert('Exit', 'Are you sure you wanna logout?', [
      {
        text: 'Cancel'
      },
      {
        text: 'Confirm',
        onPress: () => {
          Cookies.remove('userid');
          this.props.resetUser();
        }
      }
    ]);
  };

  render() {
    const { username, type, avatar, position, location, info, salary, company } = this.props.user;

    return (
      <div>
        <Result
          img={<img src={require(`../../assets/images/${avatar}.jpg`)} style={{ width: 50 }} />}
          title={username}
          message={company}
        />

        <List renderHeader={() => 'Related Information'}>
          <Item multipleLine>
            <Brief>Position: {position}</Brief>
            <Brief>Location: {location}</Brief>
            <Brief>Info: {info}</Brief>
            {salary ? <Brief>Salary: {salary}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Button onClick={this.logout}>Logout</Button>
        </List>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }), { resetUser })(Profile);
