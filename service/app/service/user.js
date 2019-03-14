'use strict';

const Service = require('egg').Service;
const jwt = require('jsonwebtoken');
// 创建不会重复的值
const uuid = require('uuid');

const crypto = require('crypto');

class UserService extends Service {
    async login(user) {
        const { app } = this;
        const existUser = await this.getUserByMail(user.email);

        if (!existUser) {
            return null;
        }

        const passHash = existUser.password;
        const equal = passHash === crypto.createHmac('sha256', app.config.password_secret)
                                    .update(user.password).digest('hex');
        if (!equal) {
            return false;
        }

        const token = jwt.sign({ userId: existUser.userId }, app.config.jwtSecret, { expiresIn: '7d' });
        return token;
    }

    async register(user) {
        const { ctx, app } = this;
        user.userId = uuid.v4().replace(/-/g, '');
        const queryResult = await this.hasRegister(user.email);
        if (queryResult) {
            ctx.returnBody(200, '邮箱已被使用', {
                flag: false,
            });
            return;
        }

        user.password = crypto.createHmac('sha256', app.config.password_secret)
            .update(user.password).digest('hex');

        const userInfo = await ctx.model.User.create(user);
        ctx.returnBody(200, '注册成功', {
            userId: userInfo.dataValues.userId,
            flag: true,
        });
        return userInfo.dataValues;
    }

    async hasRegister(email) {
        const user = await this.ctx.model.User.findOne({
            where: { email },
        });

        // user.dataValues ==> 查询的结果
        if (user && user.dataValues.userId) {
            return true;
        }

        return false;
    }

    async getUserByMail(email) {
        return this.ctx.model.User.findOne({
            where: { email },
        });
    }

    async getUserByUserId(userId) {
        return this.ctx.model.User.findOne({
            where: { userId },
        });
    }

    /*
     * 查找除自己外的未关注的用户
     */
    async getUserList(userId) {
        const { app } = this;
        const Op = app.Sequelize.Op;

        // 查询已关注用户
        let followList = await this.ctx.model.Follow.findAll({
            attributes: [ 'userId' ],
            where: {
                followedId: userId,
                status: 1,
            },
        });

        // 处理数据
        followList = followList.map(item => {
            return item.userId;
        });

        // 除自己外的未关注的用户
        return await this.ctx.model.User.findAll({
            attributes: [ 'userId', 'username', 'email', 'avatarUrl', 'abstract' ],
            where: {
                userId: {
                    // ne => not equal
                    [Op.ne]: userId, // 不是自己
                    [Op.notIn]: followList, // 不在已关注
                },
            },
        });
    }
}

module.exports = UserService;
