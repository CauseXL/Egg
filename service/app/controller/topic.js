'use strict';

const Controller = require('egg').Controller;

class TopicController extends Controller {
    async addTopic() {
        const { ctx } = this;
        const { topicTitle, topicImg } = ctx.request.body;
        const userId = ctx.user.userId;

        const newTopic = {
            topicImg: JSON.stringify(topicImg),
            topicTitle,
            userId,
        };

        await ctx.service.topic.insertTopic(newTopic);

        ctx.returnBody(200, '发帖成功');
    }

    async topicDetail() {
        const { ctx } = this;
        const { topicId } = ctx.request.query;

        const topicDetail = await ctx.service.topic.topicDetailHandler(topicId);

        ctx.returnBody(200, '成功', topicDetail);
    }

    async friendsTopicList() {
        const { ctx } = this;
        const userId = ctx.user.userId;

        const follower = await ctx.service.follow.findFollow({
            followedId: userId,
            status: 1,
        });
        const followList = follower.map(item => {
            return item.userId;
        });
        followList.push(userId);

        const Op = this.app.Sequelize.Op;
        const topics = await ctx.service.topic.queryTopicList({
            userId: {
                [Op.in]: followList,
            },
        });
        const topicList = [];
        for (const topic of topics) {
            const item = await ctx.service.topic.topicDetailHandler(topic.topicId);
            topicList.push(item);
        }

        topicList && ctx.returnBody(200, '成功', topicList);
    }

    async putLikeTopic() {
        const { ctx } = this;
        const { topicId, status } = ctx.request.body;
        const userId = ctx.user.userId;

        // 新帖子
        const topicStatus = {
            topicId,
            userId,
            status,
        };
        // 查询条件
        const query = {
            topicId,
            userId,
        };

        // 未曾创建进行创建操作，否则进行更新
        await ctx.service.topic.putTopicLike(query, topicStatus);

        ctx.returnBody(200, '更新成功', {
            status: +status,
        });
    }

    // 添加评论
    async addDiscuss() {
        const { ctx } = this;
        const { topicId, replyContent } = ctx.request.body;
        const userId = ctx.user.userId;
        const userInfo = await ctx.service.user.getUserByUserId(userId);
        const replyName = userInfo.userName;

        const discussStatus = {
            topicId,
            replyContent,
            userId,
            replyName,
        };

        await ctx.model.Discuss.create(discussStatus);

        ctx.returnBody(200, '发表成功');
    }
}

module.exports = TopicController;
