/**
 * Faculty
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  //学院表
  adapter: 'mongo',
  schema: true,
  tableName : 'faculty',
  attributes: {
  	id: 'string',//z开头,01-13结尾
    name: 'string'//学院名
  }
};
