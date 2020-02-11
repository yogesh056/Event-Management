import { Card, Icon, Avatar,Collapse,Carousel, Radio } from 'antd';
import React from 'react';
const { Panel } = Collapse;

const { Meta } = Card;
function onChange(a, b, c) {
  console.log(a, b, c);
}
export default class CardContainer extends React.Component {
  state = {
    dotPosition: 'top',
  };
  render() {
    const { dotPosition } = this.state;

    return(
      <React.Fragment>

  <Card
    style={{ width: 300 }}
    cover={
      
        <img alt="example" src="https://p4.wallpaperbetter.com/wallpaper/737/338/350/night-cityscape-colorful-new-york-city-wallpaper-cf6ce27fed995548e7dd522484430020.jpg" />

    }
    actions={[

      <Icon type="like" key="edit" />,
      <Icon type="dislike" key="ellipsis" />,
    ]}
  >
  
    <Meta
      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
      title="Card title"
    />
     <Collapse showArrow={false}>
    <Panel header="This is panel header 1">
      <p>"hello"</p>
    </Panel>
  </Collapse>
  </Card>
      </React.Fragment>
  )
  }
}