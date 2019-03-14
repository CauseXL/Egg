import React from 'react';
import Style from './index.scss';
import API from '@common/api.js'
import { notification } from 'antd';
import { connect } from 'react-redux';

@connect(
    store => {
        return {
        userInfo: store.userInfo
        }
    }
)
class Comments extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            replyContent: '',
            topicLike: props.topicLike,
        }
    } 

    handleChange (event) {
        this.setState({
            replyContent: event.target.value
        })
    }

    async _handleKeyPress(event) {
        if (event.key === 'Enter') {
            if (!this.state.replyContent) {
                    notification['error']({
                    message: '请输入评论内容'
                })
                return;
            }
            const response = await API.addDiscuss({
                topicId: this.props.topicId,
                replyContent: this.state.replyContent,
            })
            notification['success']({
                message: response.message,
            })

            // 添加评论
            this.props.addComments({
                replyContent: this.state.replyContent,
                replyName: this.props.userInfo.username,
                index: this.props.topicIndex,
            });

            // 清空评论
            this.setState({
                replyContent: ''
            })
        }
    }

    async topicLike() {
        let response = await API.topicLike({topicId: this.props.topicId, status: this.props.topicLike? 0 : 1});
        // 确定点赞数，status: 1点赞，0取消
        let dotCounts;
        if (response.data.status){
            dotCounts = this.props.dotCounts + 1;
        } else {
            dotCounts = this.props.dotCounts - 1 >= 0 ? this.props.dotCounts - 1 : 0;
        }
        this.props.topicLikeFn({
            index: this.props.topicIndex,
            topicLikeCounts: dotCounts, 
            topicLike: response.data.status === 1,
        });
    }

    render () {
        const CommentsList = () => {
            return (
                <ul className={'comments-list'}>
                    {
                        this.props.discuss.length === 0 ?
                            <li className="content">
                                暂时没有评论哦~
                            </li>
                            : "评论"
                    }
                    { 
                        this.props.discuss.map((item,index) => {
                            return (
                                <div key={index}>
                                    <li className='content no-hidden'>
                                        <span className="username u-f-black">{item.replyName}:</span>
                                        <span className="replay-content u-f-black-blod">{item.replyContent}</span>
                                    </li>
                                </div>
                            )
                        })
                    }
                </ul>
            )
        }
        
        return (
            <div className={Style['comments-section']}>
                <div className="options">
                <div className="fl-left">
                    <span className={`favorite ${this.props.topicLike && 'active'}`} onClick={this.topicLike.bind(this)}></span>
                    <span className="comments"></span>
                </div>
                {/* <span className="fl-right collect"></span> */}
                </div>
                {
                    this.props.dotCounts?
                    <div className="dot-counts u-f-black">{this.props.dotCounts}次赞</div>
                    :
                    <div className="dot-counts u-f-black">赞</div>
                }
                <CommentsList />
                <div className="add-comments">
                <input type="text" ref="textInput" className="u-f-black"
                    value={this.state.replyContent}
                    onChange={this.handleChange.bind(this)}
                    placeholder="添加评论"
                    onKeyPress={this._handleKeyPress.bind(this)}
                />
                {/* <span className="more"></span> */}
                </div>
            </div>
        )
    }
}

export default Comments;
