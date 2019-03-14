'use strict';

const Controller = require('egg').Controller;

class FriendController extends Controller {
    async follow() {
        const { ctx } = this;
        const { userId, status } = ctx.request.body;

        const followedId = ctx.user.userId;

        const followData = {
            followedId,
            status,
            userId,
        };

        await ctx.service.follow.followUser(followData);

        ctx.returnBody(200, +status ? '关注成功' : '取消成功');
    }

    async notFollowList() {
        const { ctx } = this;

        const userId = ctx.user.userId;

        const friendList = await ctx.service.user.getUserList(userId);

        ctx.returnBody(200, '获取成功', friendList);
    }
}

module.exports = FriendController;
