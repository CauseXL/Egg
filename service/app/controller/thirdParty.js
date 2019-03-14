'use strict';

const Controller = require('egg').Controller;

class ThirdPartyController extends Controller {
    async getQiniuToken() {
        const { ctx } = this;
        const token = await ctx.service.qiniu.getQiniuToken();

        ctx.returnBody(200, '获取token成功', {
            token,
            baseUrl: 'http://pochznoyj.bkt.clouddn.com',
        });
    }
}

module.exports = ThirdPartyController;
