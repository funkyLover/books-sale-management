/**
 * Stock
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  //库存表
  adapter: 'mongo',
  schema: true,
  tableName : 'stock',
  attributes: {
  	id: 'string',
    detail: 'json',//书本信息,没条记录只有一本书
    edition: 'string',//版次
    count: 'integer',//库存数量
    countByCheck: 'integer',//清点后库存
    pal: 'integer',//盈亏数
    palm: 'float'//盈亏金额
  }

};
