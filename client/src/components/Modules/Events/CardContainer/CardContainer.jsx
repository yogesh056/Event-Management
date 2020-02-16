import { Skeleton, Switch, List, Avatar, Icon,Tooltip,Progress,message,Typography,Tag,Divider,Card} from 'antd';
import React from 'react';
import CommentModal from '../Feed/CommentModal';
import {AddEvent} from '../AddEvent'
import API from "../../../../middleware/api"
const { Text } = Typography;
const { Meta } = Card;


// const listData = [];
// for (let i = 0; i < 3; i++) {
//   listData.push({
//     href: 'http://ant.design',
//     title: `ant design part ${i}`,
//     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//     description:
//       'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//     content:
//       'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//   });
// }
export default class CardContainer extends React.Component {
  state = {
    eventLoading: true,
    visible: false,
    confirmLoading: false,
    likes:123,
    name:"hello"
  };
  componentWillMount()
  {
    this.getAllEvents()
  }
  getAllEvents =async()=>
  {
    let response= await API.get('/events/getEvents')
    response.data.code===200?message.success(response.data.msg,4): message.error(response.data.msg,4); 
    console.log("res",response.data.response)
    this.setState({events:response.data.response,eventLoading:false})
  }
  onChange = checked => {
    this.setState({ loading: !checked });
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    this.setState({
        ModalText: 'The modal will be closed after two seconds',
        confirmLoading: true,
    });
    setTimeout(() => {
        this.setState({
            visible: false,
            confirmLoading: false,
        });
    }, 2000);
};

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };
  render() {
    const { eventLoading, visible, confirmLoading,likes,name,events} = this.state;

    return (
      [ <AddEvent/>,
      <div className="list-events">
        <List
          itemLayout="vertical"
          size="large"
          dataSource={events}
          renderItem={item => (
            <List.Item
              key={item.name}
              actions={
                !eventLoading && [
                 
                  <span key="comment-basic-like">
                    <Tooltip title="Like">
                    <Icon type="like-o" key="skeleton-star-o" />
                    </Tooltip>
                    <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
                  </span>,
                   <span key="comment-basic-like">
                    <Tooltip title="Like">
                    <Icon type="dislike-o" key="skeleton-like-o" />
                    </Tooltip>
                    <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
                  </span>,
                   <span key="comment-basic-like">
                    <Tooltip title="Like">
                    <Icon type="message" key="skeleton-message" onClick={this.showModal} />
                    </Tooltip>
                    <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
                  </span>,
                ]
              }
              extra={
                !eventLoading && (
                  <img
                    width={272}
                    alt="logo"
                    src={item.images}
                  />
                )
              }
              
            >
                    <CommentModal  name={item.name} user={item.user} event={item} showModal={this.showModal} handleCancel={this.handleCancel} confirmLoading={confirmLoading} visible={visible} handleOk={this.handleOk} />

              <Skeleton loading={eventLoading} active avatar>
                <List.Item.Meta
                  avatar={<Avatar src={item.user.image} />}
                  title={<a>{item.user.user_name}</a>}
                  // description={item.name}
                />
                <Meta title={item.name}/>
                <Divider/>
                <Text strong> {item.description}</Text>
               
              </Skeleton>
              <Progress percent={90} />
            </List.Item>
          )}
        />
      </div>]
    );
  }
}

