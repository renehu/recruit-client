import React, { Component } from "react";
import { List, Grid } from "antd-mobile";

export default class AvatarSelect extends Component {
  constructor(props) {
    super(props);

    this.avatarArray = [];

    for (let index = 0; index < 9; index++) {
      this.avatarArray.push({
        text: "avatar" + (index + 1),
        icon: require(`../../assets/images/avatar${index + 1}.jpg`),
      });
    }
  }

  render() {
    const listAvatar = "Please select your avatar";
    return (
      <div className="logo-container">
        <List renderHeader={() => listAvatar}>
          <Grid data={this.avatarArray} columnNum={3}></Grid>
        </List>

        <h6>
          <a
            href="https://www.freepik.com/vectors/job-opportunity"
            target="_blank"
          >
            Avatar images created by studiogstock - www.freepik.com
          </a>
        </h6>
      </div>
    );
  }
}
