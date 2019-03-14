import React from 'react';
import { Menu, Dropdown, notification } from 'antd';
import { Link } from 'react-router-dom';
import Style from './index.scss';
import API from '@common/api'
import { withRouter } from 'react-router'
import PropTypes from "prop-types";
import { connect } from "react-redux";

@connect(
    store => {
        return {
            userInfo: store.userInfo,
        }
    },
    dispatch => {
        return {
            addUserInfo: info => {
                dispatch({
                    type: 'ADD_USERINFO',
                    info,
                })
            },
        }
    },
)

class Nav extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            toggle: true,
            focusStatus: false,
            search: ''
        }
    }
    render () {
        const aboutMenu = (
            <Menu>
                <Menu.Item>关于我</Menu.Item>
                <Menu.Item onClick={this.signOut.bind(this)}>退出登录</Menu.Item>
            </Menu>
        );
        return (
            <nav className={Style['page-header']}>
                <div ref="header" className={`header ${this.state.toggle?'' : 'toggle'}`} >
                    <div className="logo-space">
                        {
                            this.state.toggle?
                            <Link  className="instagram" to={'/'} />
                            :
                            <Link  className="icon" to={'/'} />
                        }
                    </div>
                    <div className="search">
                    {
                        this.state.focusStatus?
                        <div className="search-content">
                            <input 
                                className="search-input"
                                type="text" 
                                onKeyPress={this.searchContent}
                                placeholder="搜索" 
                                onChange={this.handelChange.bind(this)} 
                                autoFocus={this.state.focusStatus}  
                                onBlur={this.focusSearchInput.bind(this)} />
                            <span className="icon"></span>
                            {/* <span className="close active"></span> */}
                        </div>
                        : 
                        <div className="search-block" onClick={this.focusSearchInput.bind(this)}>
                            <span className="block-icon"></span>
                            <span className="block-text">搜索</span>
                        </div>
                    }
                    </div>
                    <div className="navigate">
                        <Link  className="explore" to={'/'} />
                        <Link  className="love" to={'/'} />
                        <Dropdown overlay={aboutMenu} >
                            <Link  className="user" to={'/about'}/>
                        </Dropdown>
                    </div>
                </div>
            </nav>
        )
    }
    focusSearchInput () {
    }

    onScroll(event) {

    }

    searchContent(event) {
    }

    handelChange (event){
    }

    signOut () {
        API.signout().then(response => {
            notification['success']({
				message: response.message,
            });
            this.props.history.push('/login');
        });
    }

    componentDidMount () {
        if (!this.props.userInfo.userId) {
            API.getUserInfo().then(response => {
                this.props.addUserInfo(response.data);
            });
        }
    }

    componentWillUnmount(){
    }
}

export default withRouter(Nav);
