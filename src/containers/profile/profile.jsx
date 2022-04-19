import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
  render() {
    return <div>Profile settings</div>;
  }
}

export default connect((state) => ({}), {})(Profile);
