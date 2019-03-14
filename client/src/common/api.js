import instance from './axiosInstance.js';

// 注册
exports.register = (data) => {
    return instance.post('/login/register', data);
 };

// 登录
exports.login = (data) => {
    return instance.post('/login', data);
};
// 退出登录
exports.signout = (data) => {
    return instance.get('/login/signout', data);
};

// 获取用户信息
exports.getUserInfo = (data) => {
    return instance.get('/user/info', data);
}

// 未关注列表
exports.friendList = (data) => {
    return instance.get('/friend/list', data);
}

// 关注/取关
exports.followUser = (data) => {
    return instance.post('/friend/follow', data);
}

// 获取好友帖子列表
exports.friendTopicList = (data) => {
    return instance.get('/topic/friend/list', data);
}

// 点赞
exports.topicLike = (data) => {
    return instance.put('/topic/like', data);
}

// 新增帖子
exports.addTopic = (data) => {
    return instance.post('/topic/add', data);
}

// 添加评论
exports.addDiscuss = (data) => {
    return instance.post('/topic/discuss/add', data);
}

exports.getQiniuToken = (data) => {
    return instance.get('/handle/upload/get-token', data);
}
