// main router component
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../redux/actions';
import Cookies from 'js-cookie';

import { getRedirectUrl } from '../../utils';
import EmployeeInfo from '../employee-info/employee-info';
import EmployerInfo from '../employer-info/employer-info';
import Employee from '../employee/employee';
import Employer from '../employer/employer';

class Main extends Component {
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

    return (
      <div>
        <Switch>
          <Route path="/employee-info" component={EmployeeInfo} />
          <Route path="/employer-info" component={EmployerInfo} />
          <Route path="/employee" component={Employee} />
          <Route path="/employer" component={Employer} />
        </Switch>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }), { getUser })(Main);
