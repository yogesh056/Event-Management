import { Skeleton, Switch, List, Avatar, Icon,Tooltip,Progress} from 'antd';
import React from 'react';
import CommentModal from '../Feed/CommentModal';

const listData = [];
for (let i = 0; i < 3; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}
export default class CardContainer extends React.Component {
  state = {
    loading: false,
    visible: false,
    confirmLoading: false,
    likes:123,
    name:"hello"
  };

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
    const { loading, visible, confirmLoading,likes,name} = this.state;

    return (
      <div className="list-events">
        <CommentModal  name={name} showModal={this.showModal} handleCancel={this.handleCancel} confirmLoading={confirmLoading} visible={visible} handleOk={this.handleOk} />
        <List
          itemLayout="vertical"
          size="large"
          dataSource={listData}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={
                !loading && [
                 
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
                !loading && (
                  <img
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                )
              }
            >
              <Skeleton loading={loading} active avatar>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<a href={item.href}>{item.title}</a>}
                  description={item.description}
                />
                {item.content}
              </Skeleton>
              <Progress percent={90} />,
            </List.Item>
          )}
        />
      </div>
    );
  }
}

