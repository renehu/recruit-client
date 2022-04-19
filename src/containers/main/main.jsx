// main router component
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../redux/actions';
import Cookies from 'js-cookie';
import { NavBar } from 'antd-mobile';

import { getRedirectUrl } from '../../utils';
import EmployeeInfo from '../employee-info/employee-info';
import EmployerInfo from '../employer-info/employer-info';
import Employee from '../employee/employee';
import Employer from '../employer/employer';
import Message from '../message/message';
import Profile from '../profile/profile';
import NotFound from '../../components/not-found/not-found';
import FooterTabBar from '../../components/footer-tab-bar/footer-tab-bar';

class Main extends Component {
  navList = [
    {
      path: '/employer',
      component: Employer,
      title: 'Employee List',
      icon: 'employee',
      text: 'Employee'
    },
    {
      path: '/employee',
      component: Employee,
      title: 'Employer List',
      icon: 'employer',
      text: 'Employer'
    },
    {
      path: '/message',
      component: Message,
      title: 'Message List',
      icon: 'message',
      text: 'Message'
    },
    {
      path: '/profile',
      component: Profile,
      title: 'Profile',
      icon: 'profile',
      text: 'Profile'
    }
  ];

  componentDidMount() {
    const userid = Cookies.get('userid');
    const { _id } = this.props.user;
    // auto login
    if (userid && !_id) {
      // req ajax to get user
      this.setState(this.props.getUser().data);
    }
  }

  render() {
    // no cookie, return to login
    const userid = Cookies.get('userid');
    if (!userid) {
      return <Redirect to="/login" />;
    }

    const { user } = this.props;

    if (!user._id) {
      return null;
    } else {
      let url = this.props.location.pathname;

      if (url === '/') {
        url = getRedirectUrl(user.type, user.avatar);
        return <Redirect to={url} />;
      }
    }

    const navList = this.navList;
    const path = this.props.location.pathname;
    const nav = navList.find((nav) => nav.path === path);

    return (
      <div>
        {nav ? <NavBar>{nav.title}</NavBar> : null}

        <Switch>
          {navList.map((nav) => (
            <Route path={nav.path} component={nav.component} />
          ))}
          <Route path="/employee-info" component={EmployeeInfo} />
          <Route path="/employer-info" component={EmployerInfo} />
          <Route component={NotFound} />
        </Switch>

        {nav ? <FooterTabBar navList={navList} /> : null}
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }), { getUser })(Main);
