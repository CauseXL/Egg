'use strict';

const Service = require('egg').Service;

class FollowService extends Service {
    /*
     * 关注用户
     */
    async followUser(followUser) {
        const { ctx } = this;
        const obj = await ctx.model.Follow.findOne({
            where: {
                userId: followUser.userId,
            },
        });
        if (obj) {
            return await obj.update(followUser);
        }
        return await ctx.model.Follow.create(followUser);
    }

    async findFollow(query) {
        const { ctx } = this;
        return await ctx.model.Follow.findAll({
            where: query,
        });
    }
}

module.exports = FollowService;
