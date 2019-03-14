'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = `hi, ${JSON.parse(JSON.stringify(this.ctx.user)).userId}`;
  }
}

module.exports = HomeController;
