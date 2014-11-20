/**
 * ProOut
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  //出库单
  adapter: 'mongo',
  schema: true,
  tableName : 'proOut',
  attributes: {
  	id: 'string',
    details: 'json',//出库单明细
    price: 'float',//总价
    detailCount: 'integer',//出库条目 即出几类书
    isPay: {
      type: 'boolean',
      defaultsTo: false
    },//是否付款
    isRefund: 'boolean',//是否退货
    handler: 'string',//经手人
    client: 'string',//领用人姓名
    clientPhone: 'string'//领用人联系方式
  }

};
