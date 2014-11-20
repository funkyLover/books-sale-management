/**
 * Book
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  //书资料库
  adapter: 'mongo',
  schema: true,
  tableName : 'book',
  attributes: {
  	bookId: 'string',//正常采购下会有书号,自饮情况自编码 3位学院号,4位流水号
    title: 'string',//书名
    author: 'string',//作者
    press: 'string',//出版社
    edition: 'string',//版次印次
    price: 'float',//单价
    faculty: 'string',//所属学院代号
    fname : 'string',//学院名称
    stock: {//库存数,默认库存为0
      type: 'integer',
      defaultsTo: 0
    },
    stockByCount: 'integer',//经清点后的实际库存数,清点后才有数值,所以没有默认值,即为空
    countDate: 'date',//清点日期
    pal: 'integer',//盈亏数
    palm: 'float'//盈亏金额
  }
};
