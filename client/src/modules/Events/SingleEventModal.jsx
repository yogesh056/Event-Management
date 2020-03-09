import React from 'react';
import { Comment, Form, Button, Input, Modal } from 'antd';
import moment from 'moment';
import API from "../../middleware/api"
import { Skeleton, Switch, List, Avatar, Icon, Tooltip, Progress, message, Typography, Tag, Divider, Card, Empty } from 'antd';
const { Text } = Typography;
const { Meta } = Card;
const { TextArea } = Input;
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
export default class SingleEventModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            submitting: false,
            value: '',
        };
    }
    componentWillMount() {
        this.eventUpdate()
    }
    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
            this.eventUpdate()
            return true;
        } else return false;
    }
    eventUpdate = async () => {
        let eventRes = await API.post('/events/getEvent', { event_id: this.props.eventDetails.id, user_id: this.props.userDetail.id })
        this.setState({ comments: eventRes.data.comments, upVote: eventRes.data.upVote, downVote: eventRes.data.downVote, eventLoading: false, voteBool: eventRes.data.voteBool }, () => {
            console.log("Current Event", this.state)
        }

        )

    }
    likeFunc = async (voteBool) => {
        let res = await API.post('/events/vote', { event_id: this.props.eventDetails.id, user_id: this.props.userDetail.id, vote_bool: voteBool })
        this.eventUpdate()
    }
    handleSubmit = async () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });
        let response = await API.post('/events/addComment', { event_id: this.props.eventDetails.id, user_id: this.props.userDetail.id, comment: this.state.value })
        response.data.code === 200 ? message.success(response.data.msg, 4) : message.error(response.data.msg, 4);
        this.eventUpdate()
        setTimeout(() => {
            this.setState({
                submitting: false,
            });
        }, 1000);
    };
    deleteComment = async(id) => {
        let response = await API.post('/events/deleteComment', { event_id: this.props.eventDetails.id, comment_id:id })
        this.eventUpdate()
    }

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };
    render() {
        const { visible, name, userDetail, eventDetails } = this.props;
        const { comments, submitting, value, downVote, upVote, voteBool } = this.state;
        return (
            <Modal
                width={900}
                title={name}
                footer={null}
                visible={visible}
                onCancel={this.props.handleCancel}
            >
                <div className="event-single-wrap">
                    {eventDetails && <Card
                        title={<Meta
                            avatar={<Avatar src={eventDetails.user.image} />}
                            title={eventDetails.user.user_name}
                            description={moment(eventDetails.createdAt).fromNow()}
                        />}
                        style={{ width: "100%" }}
                    >

                        <Card
                            style={{ width: "100%" }}
                            className="main-wrap-card"
                            cover={
                                <img
                                    alt="example"
                                    src={eventDetails.images}
                                />
                            }
                            actions={[
                                <span key="comment-basic-like" style={{ color: voteBool === "liked" ? "cornflowerblue" : "" }} onClick={() => this.likeFunc(true)}>
                                    <Tooltip title="Like">
                                        <Icon type="like-o" key="skeleton-star-o" />
                                    </Tooltip>
                                    <span style={{ paddingLeft: 8, cursor: 'auto' }}>{upVote}</span>
                                </span>,
                                <span key="comment-basic-like" style={{ color: voteBool === "disliked" ? "cornflowerblue" : "" }} onClick={() => this.likeFunc(false)}>
                                    <Tooltip title="DisLike">
                                        <Icon type="dislike-o" key="skeleton-like-o" />
                                    </Tooltip>
                                    <span style={{ paddingLeft: 8, cursor: 'auto' }}>{downVote}</span>
                                </span>,
                                <span key="comment-basic-like" >
                                    <Tooltip title="Share">
                                        <Icon type="share-alt" />
                                    </Tooltip>
                                    <span style={{ paddingLeft: 8, cursor: 'auto' }}>{"Share"}</span>
                                </span>,
                            ]}
                        >
                            <Meta
                                // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={eventDetails.name}
                                description={eventDetails.description}
                            />

                            <Progress percent={30} size="small" />
                        </Card>
                    </Card>}
                    {userDetail && <Comment
                        avatar={
                            <Avatar
                                src={userDetail.image}
                                alt={userDetail.user_name}
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
                    />}
                    {comments.length > 0 ?
                        <List
                            dataSource={comments}
                            header={`${comments.length} ${comments.length > 1 ? 'comments' : 'comment'}`}
                            itemLayout="horizontal"
                            renderItem={item =>
                                item.author ? <></> :
                                    <List.Item>
                                        <Comment
                                            style={{ width: "100%" }}
                                            author={item.user.user_name}
                                            avatar={
                                                <Avatar
                                                    src={item.user.image}
                                                    alt={item.user.user_name}
                                                />
                                            }
                                            content={
                                                <p>
                                                    {item.comment}
                                                </p>
                                            }
                                            datetime={
                                                <Tooltip >
                                                    <span>{moment(item.createdAt).fromNow()}</span>
                                                </Tooltip>
                                            }
                                        />
                                        <span style={{ color: "red", fontSize: "14px",cursor:"pointer" }} onClick={() => this.deleteComment(item.id)}>
                                            {item.user.id === userDetail.id ? <Icon type="delete" /> : ""}
                                        </span>

                                    </List.Item>
                            }
                        /> : <Empty description={"No Comments"} />
                    }
                </div>
            </Modal>
        );
    }
}