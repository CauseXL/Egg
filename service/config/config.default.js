'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1549873942181_1267';

  // add your config here
  config.middleware = [ 'authorization' ];

  config.security = { csrf: { enable: false } };

  config.sequelize = {
    dialect: 'mysql',
    database: 'Instagram',
    host: 'localhost',
    port: 3306,
    password: '123456',
  };

  config.authWhiteList = [ '/api/v2/login', '/api/v2/login/register' ];

  config.password_secret = '123456abc';
  config.jwtSecret = '123456abc';
  config.auth_cookie_name = 'token';


  return config;
};
