import React from 'react';
import { Button } from 'antd-mobile';

export default class NotFound extends React.Component {
  render() {
    return (
      <div>
        <h2>404</h2>
        <br />
        <Button type="primary" onClick={() => this.props.history.replace('/')}>
          Back to main
        </Button>
      </div>
    );
  }
}
