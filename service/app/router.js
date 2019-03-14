'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { user, login, topic, friend, thirdParty } = controller;
  // api版本
  const apiV2Router = app.router.namespace('/api/v2');

  router.get('/', controller.home.index);
  router.get('/api', controller.api.index);

  apiV2Router.post('/login/register', login.register);
  apiV2Router.post('/login', login.loginIn);
  apiV2Router.get('/login/signout', login.signOut);

  // user
  apiV2Router.get('/user/info', user.userInfo); // 用户信息

  // friend
  apiV2Router.post('/friend/follow', friend.follow); // 关注
  apiV2Router.get('/friend/list', friend.notFollowList); // 未关注用户

  // topic
  apiV2Router.post('/topic/add', topic.addTopic); // 新增帖子
  apiV2Router.get('/topic/detail', topic.topicDetail); // 获取帖子详情
  apiV2Router.post('/topic/discuss/add', topic.addDiscuss); // 新增评论
  apiV2Router.get('/topic/friend/list', topic.friendsTopicList);
  apiV2Router.put('/topic/like', topic.putLikeTopic); // 点赞

  apiV2Router.get('/handle/upload/get-token', thirdParty.getQiniuToken);
};
