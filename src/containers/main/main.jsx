// main router component
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import EmployeeInfo from "../employee-info/employee-info";
import EmployerInfo from "../employer-info/employer-info";

class Main extends Component {
  render() {
    const { user } = this.props;
    // redirect to login if no cookie
    if (!user._id) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <Switch>
          <Route path="/employee-info" component={EmployeeInfo} />
          <Route path="/employer-info" component={EmployerInfo} />
        </Switch>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }))(Main);
