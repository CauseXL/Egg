'use strict';

module.exports = (option, app) => {
    return async function(ctx, next) {
        if (app.config.authWhiteList.indexOf(ctx.url) !== -1) {
            // 下个路由/中间件
            await next(option);
            return;
        }

        if (ctx.cookies.get('token')) {
            const token = ctx.cookies.get('token');
            try {
                ctx.jwt.verify(token, app.config.jwtSecret);
            } catch (e) {
                ctx.returnBody(401, '您未登录，请登录后再试');
                return;
            }
            await next(option);
        } else {
            ctx.returnBody(401, '您未登录，请登录后再试');
            return;
        }
    };
};
