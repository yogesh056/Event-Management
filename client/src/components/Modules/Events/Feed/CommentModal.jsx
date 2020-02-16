import React from 'react';
import { Comment, Avatar, Form, Button, List, Input, Modal,Icon } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
            <Icon type="message" key="skeleton-message" /> Add Comment
      </Button>
        </Form.Item>
    </div>
);
export default class CommentModal extends React.Component {
    constructor(props) {
        super(props);
        console.log("CM", this.props)
        this.state = {
            comments: [],
            submitting: false,
            value: '',
        };
    }
    handleSubmit = () => {
        if (!this.state.value) {
          return;
        }
    
        this.setState({
          submitting: true,
        });
    
        setTimeout(() => {
          this.setState({
            submitting: false,
            value: '',
            comments: [
              {
                author: 'Han Solo',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: <p>{this.state.value}</p>,
                datetime: moment().fromNow(),
              },
              ...this.state.comments,
            ],
          });
        }, 1000);
      };
    
      handleChange = e => {
        this.setState({
          value: e.target.value,
        });
      };
    render() {
        const { visible, confirmLoading ,name} = this.props;
        const { comments, submitting, value } = this.state;
        return (
            <Modal
            width={900}
                title={name}
                visible={visible}
                onOk={this.props.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.props.handleCancel}
            >
                <div>
                    <Comment
                        avatar={
                            <Avatar
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                alt="Han Solo"
                            />
                        }
                        content={
                            <Editor
                                onChange={this.handleChange}
                                onSubmit={this.handleSubmit}
                                submitting={submitting}
                                value={value}
                            />
                        }
                    />
                    {comments.length > 0 && <CommentList comments={comments} />}
                </div>
            </Modal>
        );
    }
}