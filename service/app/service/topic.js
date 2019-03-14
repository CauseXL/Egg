'use strict';

const Service = require('egg').Service;

class TopicService extends Service {
    async insertTopic(topicParams) {
        return await this.ctx.model.Topic.create(topicParams);
    }

    async queryTopicDetail(query) {
        const { ctx } = this;
        return await ctx.model.Topic.findOne({
            where: query,
        });
    }

    async queryTopicList(query) {
        return await this.ctx.model.Topic.findAll({
            where: query,
            order: [[ 'created_at', 'DESC' ]],
        });
    }

    async topicDetailHandler(topicId) {
        const { ctx } = this;
        const topic = await ctx.service.topic.queryTopicDetail({
            topicId: +topicId,
        });
        const userId = topic.userId;
        const user = await this.service.user.getUserByUserId(userId);

        const topicLikeCounts = await ctx.service.topic.queryTopicLikeCounts({
            topicId: +topicId, // 帖子id
            // userId: ctx.user.userId,
            status: 1,
        });

        const topicLike = await ctx.service.topic.queryTopicLike({
            topicId: +topicId, // 帖子id
            userId: ctx.user.userId,
            status: 1,
        });

        // 查询帖子评论
        const discuss = await ctx.service.topic.queryDiscuss({
            topicId: +topicId, // 帖子id
            // userId: ctx.user.userId
        });

        const topicDetail = {
            userInfo: {
                username: user.userName,
                avatarUrl: user.avatarUrl,
                userId: user.userId,
            },
            topic: {
                topicImgList: JSON.parse(topic.topicImg),
                created_at: topic.created_at,
                topicId,
                topicTitle: topic.topicTitle,
                topicLike: !!topicLike,
                topicLikeCounts: topicLikeCounts.count,
            },
            discuss,
        };
        return topicDetail || {};
    }

    /*
     * 查找是否点过赞
     */
    async queryTopicLike(query) {
        const { ctx } = this;
        return await ctx.model.TopicLike.findOne({
            where: query,
        });
    }

    /*
     * 创建或更新点赞状态
     */
    async putTopicLike(query, topicStatus) {
        const { ctx } = this;
        const result = await this.queryTopicLike(query);

        if (!result) {
            return await ctx.model.TopicLike.create(topicStatus);
        }
        return await ctx.model.TopicLike.update(topicStatus, {
            where: query,
        });
    }

    /*
     * 查询帖子点赞数量
     */
    async queryTopicLikeCounts(query) {
        const { ctx } = this;
        return await ctx.model.TopicLike.findAndCountAll({
            where: query,
        });
    }

    async queryDiscuss(query) {
        const { ctx } = this;
        return await ctx.model.Discuss.findAll({
            where: query,
        });
    }

}

module.exports = TopicService;
