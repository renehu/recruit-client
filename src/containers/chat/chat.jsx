import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar, List, InputItem } from 'antd-mobile';
import { sendMsg } from '../../redux/actions';

const Item = List.Item;

class Chat extends Component {
  state = {
    content: ''
  };

  handleSendMsg = () => {
    //collect data
    const from = this.props.user._id;
    const to = this.props.match.params.userid;
    const content = this.state.content.trim();
    // send msg
    if (content) {
      this.props.sendMsg({ from, to, content });
    }
    // clear msg in input
    this.setState({ content: '' });

    // load new msg
  };

  render() {
    const { user } = this.props;
    const { users, chatMsgs } = this.props.chat;

    const userId = user._id;
    if (!users[userId]) {
      return null;
    }

    const currentChatObjUserId = this.props.match.params.userid;
    const currentChatId = [userId, currentChatObjUserId].sort().join('_');
    const currentChatObjAvatar = users[currentChatObjUserId].avatar;
    const currentChatObjAvatarIcon = currentChatObjAvatar
      ? require(`../../assets/images/${currentChatObjAvatar}.jpg`)
      : require('../../assets/images/default.jpg');

    const currentMsgList = chatMsgs.filter((i) => i.chat_id === currentChatId);

    return (
      <div id="chat-page">
        <NavBar>{users[currentChatObjUserId].username}</NavBar>
        <List>
          {currentMsgList.map((msg) => {
            // to me
            if (msg.from === currentChatObjUserId) {
              return (
                <Item key={msg._id} thumb={currentChatObjAvatarIcon}>
                  {msg.content}
                </Item>
              );
            } else {
              // from me
              return (
                <Item key={msg._id} className="chat-me" extra="You">
                  {msg.content}
                </Item>
              );
            }
          })}
        </List>
        <div className="am-tab-bar">
          <InputItem
            onChange={(val) => this.setState({ content: val })}
            value={this.state.content}
            placeholder="Write a message..."
            extra={<span onClick={this.handleSendMsg}>Send</span>}
          />
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user, chat: state.chat }), {
  sendMsg
})(Chat);
