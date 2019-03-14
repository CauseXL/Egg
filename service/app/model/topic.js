'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE, NOW } = app.Sequelize;

    const Topic = app.model.define('topic', {
        topicId: { type: INTEGER, primaryKey: true, autoIncrement: true },
        userId: { type: STRING(255) },
        topicTitle: { type: STRING(255), allowNull: true },
        topicImg: { type: STRING(1000), allowNull: false },
        address: { type: STRING(255), allowNull: true, defaultValue: '' },
        created_at: { type: DATE, defaultValue: NOW },
        updated_at: { type: DATE, defaultValue: NOW },
    }, {
        // 禁用修改表名; 默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数。 如果你不想这样，请设置以下内容
        freezeTableName: true,
    });

    return Topic;
};
