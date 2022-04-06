// main router component
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import EmployeeInfo from "../employee-info/employee-info";
import EmployerInfo from "../employer-info/employer-info";

export default class Main extends Component {
  render() {
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
