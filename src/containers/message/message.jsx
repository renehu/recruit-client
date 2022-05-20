import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';
import { func } from 'prop-types';
const Item = List.Item;
const Brief = Item.Brief;

/*  devide chatMsgs in to groups according to different chatObjs(chat_id), and show the latest msg
1. find the lastest msg of each chat {chat_id: latestMsg}
2. put these obj into array
3. sort array with create_time
 */
function getLatestMsgs(chatMsgs) {
  const lastMsgObjs = {};

  // 1. find the latest msg
  chatMsgs.forEach((msg) => {
    const chatId = msg.chat_id;
    let latestMsg = lastMsgObjs[chatId];
    if (!latestMsg) {
      lastMsgObjs[chatId] = msg;
    } else {
      if (msg.create_time > latestMsg.create_time) {
        lastMsgObjs[chatId] = msg;
      }
    }
  });

  // 2. put into array
  const lastMsgsArray = Object.values(lastMsgObjs);
  // 3. sort
  lastMsgsArray.sort((a, b) => b.create_time - a.create_time);

  return lastMsgsArray;
}

class Message extends Component {
  render() {
    const { user } = this.props;
    const { users, chatMsgs } = this.props.chat;

    // devide chatMsgs in to groups
    const latestMsg = getLatestMsgs(chatMsgs);

    return (
      <List>
        {latestMsg.map((msg) => {
          const currentChatObjId = msg.to === user._id ? msg.from : msg.to;
          const currentChatObj = users[currentChatObjId];

          return (
            <Item
              onClick={() => {
                this.props.history.push(`/chat/${currentChatObjId}`);
              }}
              key={msg._id}
              extra={<Badge text={0} />}
              thumb={require(`../../assets/images/${
                currentChatObj.avatar ? currentChatObj.avatar : 'default'
              }.jpg`)}
              arrow="horizontal">
              {msg.content}
              <Brief>{users[msg.to === user._id ? msg.from : msg.to].username}</Brief>
            </Item>
          );
        })}
      </List>
    );
  }
}

export default connect((state) => ({ user: state.user, chat: state.chat }), {})(Message);
