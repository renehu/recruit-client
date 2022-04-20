import React from 'react';
import { withRouter } from 'react-router-dom';
import ProTypes from 'prop-types';
import { TabBar } from 'antd-mobile';

const Item = TabBar.Item;

class FooterTabBar extends React.Component {
  static propTypes = {
    navList: ProTypes.array.isRequired
  };

  render() {
    let { navList } = this.props;
    navList = navList.filter((nav) => !nav.hide);

    const pathname = this.props.location.pathname;

    return (
      <TabBar>
        {navList.map((nav, index) => (
          <Item
            key={nav.path}
            title={nav.text}
            icon={{ uri: require(`./imgages/${nav.icon}.png`) }}
            selectedIcon={{ uri: require(`./imgages/${nav.icon}-selected.png`) }}
            selected={pathname === nav.path}
            onPress={() => this.props.history.replace(nav.path)}></Item>
        ))}
      </TabBar>
    );
  }
}

export default withRouter(FooterTabBar);
