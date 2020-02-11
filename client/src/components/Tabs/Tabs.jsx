
import React from 'react';
import { Tabs, Icon } from 'antd';
import Events from "../Events/Events"
const { TabPane } = Tabs;

export default function Tab() {
  return (
    <Tabs defaultActiveKey="2">
    <TabPane
      tab={
        <span>
        <Icon type="credit-card" />
          Events
        </span>
      }
      key="1"
    >
     <Events></Events>
    </TabPane>
    <TabPane
      tab={
        <span>
         <Icon type="team" />
          Forum
        </span>
      }
      key="2"
    >
      Tab 2
    </TabPane>
    <TabPane
      tab={
        <span>
         <Icon type="wechat" />
          Chat
        </span>
      }
      key="3"
    >
      Tab 1
    </TabPane>
    <TabPane
      tab={
        <span>
         <Icon type="user" />
          Profile
        </span>
      }
      key="4"
    >
      Tab 1
    </TabPane>
  </Tabs>
  )
}