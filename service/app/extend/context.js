'use strict';
const jwt = require('jsonwebtoken');
// 扩展一些框架便利的方法
module.exports = {
    get jwt() {
        return jwt;
    },
    // 获取 userId
    get user() {
        const token = this.cookies.get('token');
        const user = jwt.verify(token, this.app.config.jwtSecret);
        return user;
    },
    returnBody(status, message, data = {}) {
        this.status = status;
        this.body = {
            data,
            message,
            success: true,
        };
    },

    // 驼峰转下划线
    humpToUnderline(obj) {
        const newKey = obj.keys();
        const newObj = {};
        const humpReg = /([A-Z])/g;

        newKey.forEach(item => {
            newObj[item.replace(humpReg, '_$1').toLowerCase()] = obj[item];
        });
        return newObj;
    },
};
