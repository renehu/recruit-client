import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavBar, Icon, List, InputItem, Grid } from 'antd-mobile';
import { sendMsg } from '../../redux/actions';

const Item = List.Item;

class Chat extends Component {
  state = {
    content: '',
    isShowEmoji: false
  };

  componentDidMount() {
    this.emojiArray = ['😀', '🤣', '😄', '😁', '😅', '😊', '😋', '🤪', '🤐', '😷', '🤮'];
    this.emojiArray = this.emojiArray.map((emojiValue) => ({ text: emojiValue }));

    //init msg list to bottom of list, so that user can see the lastest msg
    window.scrollTo(0, document.body.scrollHeight);
  }

  componentDidUpdate() {
    // scroll to the bottom after new msg sent or got
    window.scrollTo(0, document.body.scrollHeight);
  }

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
    this.setState({ content: '', isShowEmoji: false });

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
        <NavBar
          icon={
            <Icon
              type="left"
              onClick={() => {
                this.props.history.goBack();
              }}
            />
          }
          className="header-fix">
          {users[currentChatObjUserId].username}
        </NavBar>
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
            onFocus={() => {
              this.setState({ isShowEmoji: false });
            }}
            value={this.state.content}
            placeholder="Write a message..."
            extra={
              <div>
                <span
                  style={{ marginRight: 5 }}
                  onClick={() => {
                    this.setState({ isShowEmoji: !this.state.isShowEmoji });
                  }}>
                  😀
                </span>
                <b onClick={this.handleSendMsg}>Send</b>
              </div>
            }
          />
          {this.state.isShowEmoji ? (
            <Grid
              data={this.emojiArray}
              columnNum={4}
              carouselMaxRow={3}
              isCarousel={false}
              onClick={(i) => {
                this.setState({ content: this.state.content + i.text });
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user, chat: state.chat }), {
  sendMsg
})(Chat);
