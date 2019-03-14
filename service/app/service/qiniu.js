'use strict';

const Service = require('egg').Service;
const qiniu = require('qiniu');

const accessKey = 'Wi0bHWF47_ycMWLnc9Kbxc7tOCaeQmWneLDoGwjA';
const secretKey = 'V3GQBr_GqUdUoKt_TN5KGNigy98E3jnpMlgJvmQ4';
const publicBucketDomain = 'http://pochznoyj.bkt.clouddn.com';
const options = {
  scope: 'instagram',
  expires: 7200,
};

class QiniuService extends Service {
    async getQiniuToken() {
        if (!accessKey || !secretKey || !publicBucketDomain) {
            this.ctx.throw(400, '请配置七牛鉴权参数');
        }
        const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        const putPolicy = new qiniu.rs.PutPolicy(options);
        const uploadToken = putPolicy.uploadToken(mac);
        return uploadToken;
    }
}

module.exports = QiniuService;
