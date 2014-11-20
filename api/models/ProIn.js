/**
 * ProIn
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  //入库单
  adapter: 'mongo',
  schema: true,
  tableName : 'proIn',
  attributes: {
  	id: 'string',//前两位年份 1位季度Q/C 3位流水号
    manifest: 'string',//入货单号
    details: 'array',//明细,书本信息
    price: 'float',//入库单总价
    count: 'integer',//入库总数
    isRefund: 'boolean',//是否退货
    handler: 'string'//经手人
  }
};
