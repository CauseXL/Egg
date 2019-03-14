'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE, NOW } = app.Sequelize;

    const Follow = app.model.define('follow', {
        id: { type: INTEGER(10), primaryKey: true, autoIncrement: true },
        userId: { type: STRING(255) }, // 用户id
        followedId: { type: STRING(255) }, // 关注者id
        status: { type: INTEGER(1), allowNull: false }, // 关注状态 0:取消关注，1:已关注
        created_at: { type: DATE, defaultValue: NOW },
        updated_at: { type: DATE, defaultValue: NOW },
    }, {
        // 禁用修改表名; 默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数。 如果你不想这样，请设置以下内容
        freezeTableName: true,
    });

    return Follow;
};
