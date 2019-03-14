'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE, NOW } = app.Sequelize;

    const Discuss = app.model.define('discuss', {
        discussId: { type: INTEGER(10), primaryKey: true, autoIncrement: true }, // 评论id
        topicId: { type: INTEGER(10) }, // 帖子id
        userId: { type: STRING(255) }, // 用户id
        replyName: { type: STRING(1000), allowNull: false }, // 回复者姓名
        replyContent: { type: STRING(255), allowNull: true }, // 回复内容
        created_at: { type: DATE, defaultValue: NOW }, // 创建时间
    }, {
        // 禁用修改表名; 默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数。 如果你不想这样，请设置以下内容
        freezeTableName: true,
    });

    return Discuss;
};
