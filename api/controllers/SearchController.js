/**
 * SearchController
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
    
  proin: function(req, res) {
    if(!req.isAjax) {
      return res.send({ error: 1, msg: '违规操作'});
    }
    var val = req.body['val'];
    var key = req.body['key'];
    if(val instanceof Array && val.length<2) {
      return res.send({ error: 1, msg: '请正确选择时间'});
    } else if(!val) {
      return res.send({ error: 1, msg: '请填写搜索关键字'});
    }
    if(key != 'quantum') {
      var o = {};
      o[key] = val;
      console.log(o);
      ProIn.find(o).exec(function(err, proins) {
        if(err) {
          console.error(err.message);
          return res.send({ error: 1, msg: '内部错误'});
        }
        if(proins.length == 0) {
          return res.send({ none: 1});
        }
        return res.send({ ok: 1, proins: proins, flag: 1});
      });
    } else {
      var date1 = new Date(val[0].replace(/-/g,   "/"));
      var date2 = new Date(val[1].replace(/-/g,   "/"));
      if(date1>=date2) {
        return res.send({ error: 1, msg: '请正确选择时间'});
      }
      ProIn.find().where({createdAt: {'>=': date1, '<=': date2}}).exec(function(err, proins) {
        if(err) {
          console.error(err.message);
          return res.send({ error: 1, msg: '内部错误'});
        }
        if(proins.length == 0) {
          return res.send({ none: 1});
        }
        return res.send({ok: 1, proins: proins, flag: 1});
      });
    }

  },

  proout: function(req, res) {
    if(!req.isAjax) {
      return res.send({ error: 1, msg: '违规操作'});
    }
    var val = req.body['val'];
    var key = req.body['key'];
    if(val instanceof Array && val.length<2) {
      return res.send({ error: 1, msg: '请正确选择时间'});
    } else if(!val) {
      return res.send({ error: 1, msg: '请填写搜索关键字'});
    }
    if(key != 'quantum') {
      var o = {};
      o[key] = val;
      ProOut.find(o).exec(function(err, proouts) {
        if(err) {
          console.error(err.message);
          return res.send({ error: 1, msg: '内部错误'});
        }
        if(proouts.length == 0) {
          return res.send({ none: 1});
        }
        return res.send({ ok: 1, proouts: proouts, flag: 2});
      });
    } else {
      var date1 = new Date(val[0].replace(/-/g,   "/"));
      var date2 = new Date(val[1].replace(/-/g,   "/"));
      if(date1>=date2) {
        return res.send({ error: 1, msg: '请正确选择时间'});
      }
      ProOut.find().where({createdAt: {'>=': date1, '<=': date2}}).exec(function(err, proouts) {
        if(err) {
          console.error(err.message);
          return res.send({ error: 1, msg: '内部错误'});
        }
        if(proouts.length == 0) {
          return res.send({ none: 1});
        }
        return res.send({ok: 1, proouts: proouts, flag: 2});
      });
    }

  },

  book: function(req, res) {
    if(!req.isAjax) {
      return res.send({ error: 1, msg: '违规操作'});
    }
    var val = req.body['val'];
    var key = req.body['key'];
    if(!val) {
      return res.send({ error: 1, msg: '请填写搜索关键字'});
    }
    var o = {};
    o[key] = val;
    console.log(o);
    Book.find(o).exec(function(err, books) {
      if(err) {
        console.error(err.message);
        return res.send({ error: 1, msg: '内部错误'});
      }
      if(books.length == 0) {
        return res.send({ none: 1});
      }
      return res.send({ ok: 1, books: books, flag: 3});
    });
  }
};
