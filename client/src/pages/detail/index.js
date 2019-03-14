import React from 'react'
import update from 'react-addons-update'; 
import Style from './index.scss'
import API from '@common/api.js'
import Nav from '@components/nav/index.js'
import Recommend from './components/recommend'
import DynamicList from './components/dynamic-list'
import PostTopic from './components/post-topic'

import { connect } from "react-redux";
@connect(
    store => {
        return {
            topicList: store.topicList
        }
    },
    dispatch => {
        return {
            addTopicList: info => {
                dispatch({
                    type: 'ADD_TOPICLIST',
                    info,
                })
            }
        }
    },
)
class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            followList: [],
            showPostTopic: false,
        };
        this.initFriendList();
        this.initTopicList();
    }

    async initFriendList() {
        let response = await API.friendList();
        const followList = response.data.map(item => {
            item.hasFollow = false;
            return item;
        });
        this.setState({ followList });
    }

    async initTopicList() {
        let topicResponse = await API.friendTopicList();
        this.props.addTopicList(topicResponse.data);
    }

    async setFollowStatus(index, status) {
        const data = {
            status: status ? 1 : 0,
            userId: this.state.followList[index].userId,
        };
        await API.followUser(data);
        this.setState({
            followList: update(this.state.followList, {
                [index]: {
                    hasFollow: { $set: status }
                }
            })
        })
    }

    togglePostTopic(refresh) {
        this.setState({
            showPostTopic: !this.state.showPostTopic
        })

        // 刷新数据
        if (refresh) {
            this.initTopicList()
        }
    }

    render() {
        return (
            <main>
                <Nav />
                {
                    this.state.showPostTopic ?
                    <PostTopic togglePostTopic={this.togglePostTopic.bind(this)} />
                    : ''
                }
                <div className="page-container">
                    <span className="loading"></span>
                        <div className={Style['home-detail']}>
                            <DynamicList />
                            <Recommend followList={this.state.followList}
                                togglePostTopic={this.togglePostTopic.bind(this)}
                                setFollowStatus={this.setFollowStatus.bind(this)} />
                        </div>
                </div>
            </main>
        )
    }
}

export default Detail;
