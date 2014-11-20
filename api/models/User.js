/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var crypto = require('crypto');

module.exports = {
  //用户表
  adapter: 'mongo',
  schema: true,
  tableName : 'user',
  attributes: {
  	username: 'string',
    password: {
      type: 'string',
      defaultsTo: '123456'//默认密码
    },
    name: 'string',
    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    },
    isSuper: {
      type: 'boolean',
      defaultsTo: false
    }
  }
  //密码加密
  /*beforeCreate: function(user, next) {
    str = user.password;
    user.password = crypto.createHash('md5')
        .update(str).digest('hex');
    next();
  }*/
};
