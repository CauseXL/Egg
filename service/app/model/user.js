'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE, NOW } = app.Sequelize;

    const User = app.model.define('users', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: { type: STRING(255) },
        userName: { type: STRING(255), allowNull: false },
        email: { type: STRING(255), allowNull: false },
        password: { type: STRING(255), allowNull: false },
        avatarUrl: {
            type: STRING(256),
            defaultValue: 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eq8NCmDUH8yaiafEE41EV079aPGUSOCDJiaSyYHcMwS'
            + 'qibzrgJjpUJ3xkze3oyP49wRw5VUmhZ9CLtEg/132',
        },
        mobile: STRING(32),
        prefix: STRING(32),
        abstract: { type: STRING(255), allowNull: true }, // 介绍
        sex: { type: INTEGER, defaultValue: 0 },
        created_at: { type: DATE, defaultValue: NOW },
        updated_at: { type: DATE, defaultValue: NOW },
    }, {
        // 禁用修改表名; 默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数。 如果你不想这样，请设置以下内容
        freezeTableName: true,
    });

    return User;
};

