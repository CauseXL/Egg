import React from 'react'
import Style from './index.scss'
import Carousel from '@components/carousel'
import Comments from '@components/comments'
import Avatar from '@components/avatar'
import { connect } from 'react-redux'

@connect(
    store => {
        return {
            dynamicList: store.topicList,
            userInfo: store.userInfo
        }
    },
    dispatch => {
        return {
            addComments: info => {
                dispatch({
                    type: 'ADD_COMMENT',
                    info
                })
            },
            topicLikeFn: info => {
                dispatch({
                    type: 'TOPIC_LIKE',
                    info
                })
            }
        };
    }
)
class DynamicList extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    
    render() {
        return (
            <div className={Style['dynamic-list']}>
                {
                    this.props.dynamicList.map((item,index) => {
                        return (
                        <article className="article" key={index}>
                            <header className="header">
                                <Avatar userInfo={item.userInfo}/>
                                <span>{item.topic.topicTitle}</span>
                            </header>
                            
                            <div className="container">
                                <Carousel imageList={item.topic.topicImgList}></Carousel>
                            </div>

                            {/* 评论区 */}
                            <div className="comments-content">
                                <Comments topicId={item.topic.topicId}
                                    topicLike={item.topic.topicLike}
                                    topicLikeFn={this.props.topicLikeFn}
                                    dotCounts={item.topic.topicLikeCounts}
                                    topicLike={item.topic.topicLike}
                                    topicIndex={index}
                                    discuss={item.discuss}
                                    addComments={this.props.addComments}
                                />
                            </div>
                        </article>
                        )
                    })
                }
            </div>
        )
    }
}

export default DynamicList;
