import React, { Component } from "react";
import { List, Grid } from "antd-mobile";
import { PropTypes } from "prop-types";

export default class AvatarSelect extends Component {

  static propTypes={
    setAvatar: PropTypes.func.isRequired
  }

  state={
    icon:null
  }

  handleClick=({text,icon})=>{
    this.setState({icon});
    this.props.setAvatar(text);//set father component value
  }


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
    const {icon} = this.state;

    const listAvatar = icon ? (<div>Selected avatar: <img src={icon} style={{maxWidth:100+'px'}}/></div>) 
                            : "Please select your avatar";

    return (
      <div className="logo-container">
        <List renderHeader={() => listAvatar}>
          <Grid data={this.avatarArray} columnNum={3} onClick={this.handleClick}></Grid>
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
