/**
 * StateController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
  login: function(req, res) {
    if(req.session['user']) {
      res.cookie('msg', '你已登陆');
      return res.redirect('/index');
    }
    var username = req.body['username'];
    var password = req.body['password'];
    console.log(username, password);
    User.findOneByUsername(username).exec(function (err, user) {
      if(err) {
        res.cookie('msg', '内部错误');
        return res.redirect('/');
      }
      if(!user) {
        res.cookie('msg', '用户名错误');
        return res.redirect('/');
      }
      if(user.password !== password) {
        res.cookie('msg', '密码错误');
        return res.redirect('/');
      }
      req.session['user'] = user;
      res.cookie('msg', '欢迎回来' + user.username);
      res.redirect('/index');
    })
  },

  logout: function(req, res) {
    if(!req.session['user']) {
      res.cookie('msg', '别闹了,你还没登录');
      return res.redirect('/');
    }
    delete req.session['user'];
    res.cookie('msg', '你已退出系统');
    return res.redirect('/');
  }

};
