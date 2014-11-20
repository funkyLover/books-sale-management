/**
 * ProOutController
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

var Thenjs = require('thenjs');

module.exports = {

  //新建出库单
  create: function(req, res) {
    var count = req.body['count'];
    var id = req.body['id'];
    var discount = req.body['discount'];
    var details = [];
    var totalPrice = 0;
    var isRefund = req.body['isrefund'];
    if(id instanceof Array) {
      Thenjs.each(id, function(cont, _id, index) {
        Book.findOneById(_id).exec(cont);
      }).then(function(cont, books) {
        Thenjs.each(books, function(cont2, book, index) {
          details.push({id:book.id, bookid: book.bookId, title: book.title, edition: book.edition, author:
              book.author, press: book.press, price: book.price, faculty: book.faculty + book.fname,
              count: parseInt(count[index]), discount: discount[index]});
          totalPrice += book.price * discount[index] * count[index];
          book.stock -= parseInt(count[index]);
          book.save(cont);
        }).fail(cont);
      }).then(function(cont) {
        ProOut.create({
          details: details,
          price: totalPrice,
          detailCount: id.length,
          isRefund: isRefund,
          handler: req.session['user'].id
        }).exec(cont);
      }).then(function(cont, proout) {
        console.log(proout);
        res.cookie('msg', '出库成功');
        return res.redirect('/proout/view/'+proout.id);
      }).fail(function(cout, err) {
        console.error(err.message);
        res.cookie('msg', '出库出错');
        return res.redirect('/proout/create');
      });
    } else {
      Thenjs(function(cont) {
        Book.findOneById(id).exec(cont);
      }).then(function(cont, book) {
        totalPrice += book.price * count * discount;
        details.push({id:book.id, bookid: book.bookId, title: book.title, edition: book.edition,
          author: book.author, press: book.press, price: book.price, faculty: book.faculty + book.fname,
          count: parseInt(count), discount: discount});
        book.stock -= parseInt(count);
        book.save(cont);
      }).then(function(cont, book) {
        ProOut.create({
          details: details,
          price: totalPrice,
          detailCount: 1,
          isRefund: isRefund,
          handler: req.session['user'].id
        }).exec(cont);
      }).then(function(cont, proout) {
        console.log(proout);
        res.cookie('msg', '出库成功');
        return res.redirect('/proout/view/'+proout.id);
      }).fail(function(cout, err) {
        console.error(err.message);
        res.cookie('msg', '出库出错');
        return res.redirect('/proout/create');
      });
    }
  },

  //删除出库单
  destroy: function(req, res) {
    var id = req.params['id'];
    var msg;
    ProOut.findOneById(id).exec(function(err, proout) {
      if(err) {
        console.error(err.message);
        res.cookie('msg', '内部错误');
        res.redirect('/index');
      }
      if(!proout) {
        res.cookie('msg', '没有该入库单');
        res.redirect('/index');
      }
      var details = proout.details;
      Thenjs.each(details, function(cont, detail, index) {
        Book.findOneById(detail.id).exec(function(err, book) {
          if(err) {
            console.error(err.message);
            cont(new Error('内部错误'));
          }
          if(!book) {
            cont(null);
          }
          book.stock += parseInt(detail.count);
          book.save(function(err, book) {
            if(err) {
              console.error(err.message);
              cont(new Error('内部错误'));
            }
            cont(null);
          });
        });
      }).then(function(cont) {
        proout.destroy(function(err) {
          if(err) {
            console.error(err.message);
            cont(new Error('内部错误'));
          }
          res.cookie('msg', '删除成功');
          return res.redirect('/proout/1');
        });
      }).fail(function(cont, err) {
        res.cookie(err.message);
        return res.redirect('/index');
      });
    });
  },

  //更新出库单
  update: function(req, res) {
    var id = req.params['id'];
    var client = req.body['client'];
    var phone = req.body['phone'];
    ProOut.findOneById(id).exec(function(err, proout) {
      if(err) {
        console.error(err.message);
        res.cookie('msg', '内部错误');
        return res.redirect('/index');
      }
      if(!proout){
        res.cookie('msg', '没有该出库单');
        return res.redirect('/proout/1');
      }
      proout.client = client;
      proout.clientPhone = phone;
      proout.save(function(err, _proout) {
        if(err) {
          console.error(err.message);
          res.cookie('msg', '内部错误');
          return res.redirect('/index');
        }
        res.cookie('msg', '更新成功');
        return res.redirect('/proout/view/'+_proout.id);
      });
    });
  },

  //改变出库单状态
  pay: function(req, res) {
    var id = req.params['id'];
    ProOut.findOneById(id).exec(function(err, proout) {
      if(err) {
        console.error(err.message);
        res.cookie('msg', '内部错误');
        return res.redirect('/index');
      }
      if(!proout) {
        res.cookie('msg', '没有该出库单');
        return res.redirect('/proout/1');
      }
      proout.isPay = proout.isPay ? false : true;
      proout.save(function(err, _proout) {
        if(err) {
          console.log(err.message);
          res.cookie('msg', '内部错误');
          return res.redirect('/index');
        }
        return res.redirect('/proout/view/'+_proout.id);
      });
    });
  },

  //按属性搜索出库单
  findByAtt: function(req, res) {

  }

};
