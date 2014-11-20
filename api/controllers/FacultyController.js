/**
 * FacultyController
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

  //按id获取学院信息
  find: function(req, res) {

  },

  //新建学院
  create: function(req, res) {
    console.log('faculty create');
    var id = req.body['id'];
    var name = req.body['name'];
    Faculty.findOne({
      id: id
    }).done(function(err, faculty) {
          if(err) {
            console.error(err.message);
            res.cookie('msg', '内部错误');
            return res.redirect('/index');
          }
          /*先检查该代号是否已使用*/
          if(faculty) {
            res.cookie('msg', '已存在该学院代号,请替换');
            return res.redirect('/faculty/create');
          }
          Faculty.create({
            id: id,
            name : name
          }).done(function (err, faculty) {
                if(err) {
                  console.error(err.message);
                  res.cookie('msg', '内部错误');
                  return res.redirect('/index');
                }
                if(!faculty) {
                  res.cookie('msg', '创建失败');
                  return res.redirect('/index');
                }
                console.log(faculty);
                res.cookie('msg', '创建成功');
                return res.redirect('/faculty');
              });
        });
  },

  //删除学院
  destroy: function(req, res) {
    console.log('faculty destroy');
    var id = req.params['id'];
    Book.find({
      faculty: id
    }).done(function (err, books) {
          if(err) {
            res.cookie('msg','内部错误');
            return res.redirect('/index');
          }
          if(books.length != 0) {
            res.cookie('msg', '该学院存有相关书本资料库,请先清理书本资料库再进行删除');
            return res.redirect('/faculty');
          }
          Faculty.destroy({
            id: id
          }).done(function (err) {
                if(err) {
                  console.error(err.message);
                  res.cookie('msg', '内部错误');
                  return res.redirect('/index');
                }
                res.cookie('msg', '删除成功');
                return res.redirect('/faculty');
              });
        });
  }

  //更新学院信息(无用)
 /* update: function(req, res) {
    console.log('faculty update');
    var id = req.params['id'];
    Faculty.findOne({
      id: id
    }).done(function (err, faculty) {
          if(err) {
            console.error(err.message);
            res.cookie('msg', '内部错误');
            return res.redirect('/index');
          }
          if(!faculty) {
            res.cookie('msg', '没有该学院信息');
            return res.redirect('/index');
          }
          faculty.name = req.body['name'];
          faculty.save(function (err) {
            if(err) {
              console.error(err.message);
              res.cookie('msg', '内部错误');
              return res.redirect('/index');
            }
            res.cookie('msg', '修改成功');
            return res.redirect('/faculty')
          })
        });
  }*/
  
};
