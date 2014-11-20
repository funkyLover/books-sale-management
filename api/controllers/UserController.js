/**
 * UserController
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

  //按id获取用户信息
  find: function(req, res) {

  },

  //新建用户
  create: function(req, res) {
    console.log(req.session['user'].isAdmin);
    if(!req.session['user'].isAdmin) {
      res.cookie('msg', '你没有权限');
      return res.redirect('/index');
    }
    var username = req.body['username'];
    var option = req.body['option'];
    console.log(option);
    User.find({
      username: username
    }).done(function (err, users) {
      if(err) {
        console.error(err.message);
        res.cookie('msg', '内部错误');
        return res.redirect('/index');
      }
      if(users.length != 0) {
        res.cookie('msg','已存在该用户名,请重新输入');
        return res.redirect('/user/create');
      }
      if(option == 'admin') {
        User.create({
          username: username,
          isAdmin: true
        }).done(function (err, user) {
              if(err) {
                console.error(err.message);
                res.cookie('msg', '内部错误');
                return res.redirect('/index');
              }
              if(!user) {
                res.cookie('msg', '新建失败');
                return res.redirect('/index');
              }
              res.cookie('msg', '新建成功');
              return res.redirect('/user');
            });
      } else if(option == 'user') {
        User.create({
          username: username,
          isAdmin: false
        }).done(function (err, user) {
              if(err) {
                console.error(err.message);
                res.cookie('msg', '内部错误');
                return res.redirect('/index');
              }
              if(!user) {
                res.cookie('msg', '新建失败');
                return res.redirect('/index');
              }
              res.cookie('msg', '新建成功');
              return res.redirect('/user');
            });
      } else {
        res.cookie('msg', '输入错误,请重新输入');
        return res.redirect('/index');
      }
    })
  },

  //删除用户
  destroy: function(req, res) {
    var id = req.params['id'];
    if(!req.session['user'].isAdmin) {
      res.cookie('msg', '你没有权限进行该操作');
      return res.redirect('/index');
    }
    if(req.session['user'].id == id) {
      console.log(111);
      res.cookie('msg', '不能删除自己');
      return res.redirect('/user');
    }
    User.findOne({
      id: id
    }).done(function (err, user) {
          if(err) {
            console.log(err.message);
            res.cookie('msg', '内部错误');
            return res.redirect('/index');
          }
          if(!user) {
            res.cookie('msg', '没有该用户');
            return res.redirect('/index');
          }
          if(user.isAdmin) {
            if(!req.session['user'].isSuper){
              res.cookie('msg', '你没有权限删除超级管理员');
              return res.redirect('/index');
            }
            user.destroy(function (err) {
              if(err) {
                console.log(err.message);
                res.cookie('msg', '内部错误');
                return res.redirect('/index');
              }
              res.cookie('msg', '成功删除');
              return res.redirect('/user');
            });
          } else {
            user.destroy(function (err) {
              if(err) {
                console.log(err.message);
                res.cookie('msg', '内部错误');
                return res.redirect('/index');
              }
              res.cookie('msg', '成功删除');
              return res.redirect('/user');
            });
          }
        });
  },

  //更新用户信息
  modiInfo: function(req, res) {
    var username = req.body['username'];
    var name = req.body['name'];
    var id = req.params['id'];
    User.findOne({
      id: id
    }).done(function (err, user) {
          if(err) {
            console.error(err.message);
            res.cookie('msg', '内部错误');
          }
          if(!user) {
            res.cookie('msg', '没有该用户');
            return res.redirect('/index');
          }
          if(user.username == username) {
            user.name = name;
            user.username = username;
            user.save(function (err) {
              if(err) {
                console.error(err.message);
                res.cookie('msg', '修改失败');
                return res.redirect('/index');
              }
              res.cookie('msg', '修改成功');
              req.session['user'] = user;
              return res.redirect('/user/info');
            });
          } else {
            User.find({
              username: username
            }).done(function (err, users) {
                  if(err) {
                    console.error(err.message);
                    res.cookie('msg', '内部错误');
                    return res.redirect('/index');
                  }
                  if(users.length != 0) {
                    res.cookie('msg', '已有该用户名,请重新输入');
                    return res.redirect('/index');
                  }
                  user.name = name;
                  user.username = username;
                  user.save(function (err) {
                    if(err) {
                      console.error(err.message);
                      res.cookie('msg', '修改失败');
                      return res.redirect('/index');
                    }
                    res.cookie('msg', '修改成功');
                    req.session['user'] = user;
                    return res.redirect('/user/info');
                  });
                });
          }
        });
  },

  //修改密码
  changePassword: function(req, res) {
    var oldPassword = req.body['opassword'];
    var newPassowrd1 = req.body['npassword1'];
    var newPassword2 = req.body['npassword2'];
    var id = req.params['id'];
    User.findOne({
      id: id
    }).done(function (err, user) {
          if(err) {
            console.error(err.message);
            res.cookie('msg', '内部错误');
            return res.redirect('/index');
          }
          if(!user) {
            res.cookie('msg', '没有该用户');
            return res.redirect('/index');
          }
          if(oldPassword && user.password == oldPassword) {
            if(newPassowrd1 && newPassword2) {
              if(newPassowrd1 == newPassword2) {
                user.password = newPassowrd1;
                user.save(function (err) {
                  if(err) {
                    console.error(err.message);
                    res.cookie('msg', '修改失败');
                    return res.redirect('/index');
                  }
                  res.cookie('msg', '修改成功,请重新登录');
                  delete req.session['user'];
                  return res.redirect('/');
                });
              } else {
                res.cookie('msg', '两次输入密码不一,请重新输入');
                return res.redirect('/index');
              }
            } else {
              res.cookie('msg', '请填写完整');
              return res.redirect('/index');
            }
          } else {
            res.cookie('msg', '旧密码错误');
            return res.redirect('/index');
          }
        });
  }

};
