'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async userInfo() {
    const { ctx } = this;
    const userId = ctx.query.userId || ctx.user.userId;
    console.log(userId);
    const user = await ctx.service.user.getUserByUserId(userId);
    console.log('===============', user);
    const userInfo = {
        username: user.userName,
        email: user.email,
        avatarUrl: user.avatarUrl,
        abstract: user.abstract,
        account: user.email.replace(/@.*/, ''),
        mobile: user.mobile,
        sex: user.sex,
        userId: user.userId,
    };
    ctx.returnBody(200, '获取成功', userInfo);
  }
}

module.exports = UserController;
