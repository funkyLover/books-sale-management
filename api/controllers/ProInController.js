/**
 * ProInController
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
  //新建入库单
  create: function(req, res) {
    var proinid = req.body['proinid'];
    var count = req.body['count'];
    var id = req.body['id'];
    var details = [];
    var totalPrice = 0;
    var totalCount = 0;
    var isRefund = req.body['isrefund'];
    console.log(isRefund);
    if(id instanceof Array) {
      Thenjs.each(id, function(cont, _id, index) {
        Book.findOneById(_id).exec(cont);
      }).then(function(cont, books) {
        Thenjs.each(books, function(cont2, book, index) {
          details.push({id:book.id, bookid: book.bookId, title: book.title, edition: book.edition, author:
              book.author, press: book.press, price: book.price, faculty: book.faculty + book.fname,
              count: parseInt(count[index])});
          totalPrice += book.price * count[index];
          totalCount += parseInt(count[index]);
          book.stock += parseInt(count[index]);
          book.save(cont2);
        }).then(function(cont2, books) {
          cont(null);
        }).fail(cont);
      }).then(function(cont) {
        ProIn.create({
          manifest: proinid,
          details: details,
          price: totalPrice,
          count: totalCount,
          isRefund: isRefund,
          handler: req.session['user'].id
        }).exec(cont);
      }).then(function(cont, proin) {
        console.log(proin);
        res.cookie('msg', '入库成功');
        return res.redirect('/proin/view/'+proin.id);
      }).fail(function(cout, err) {
        console.error(err.message);
        res.cookie('msg', '入库出错');
        return res.redirect('/proin/create');
      });
    } else {
      Thenjs(function(cont) {
        Book.findOneById(id).exec(cont);
      }).then(function(cont, book) {
        console.log(book);
        totalPrice += book.price * count;
        details.push({id:book.id, bookid: book.bookId, title: book.title, edition: book.edition,
          author: book.author, press: book.press, price: book.price, faculty: book.faculty + book.fname,
          count: parseInt(count)});
        totalCount += parseInt(count);
        book.stock +=  parseInt(count);
        book.save(cont);
      }).then(function(cont, book) {
        console.log(book, 1);
        ProIn.create({
          manifest: proinid,
          details: details,
          price: totalPrice,
          count: totalCount,
          isRefund: isRefund,
          handler: req.session['user'].id
        }).exec(cont);
      }).then(function(cont, proin) {
        console.log(proin);
        res.cookie('msg', '入库成功');
        return res.redirect('/proin/view/'+proin.id);
      }).fail(function(cout, err) {
        console.error(err.message);
        res.cookie('msg', '入库出错');
        return res.redirect('/proin/create');
      });
    }
  },

  //删除入库单
  destroy: function(req, res) {
    var id = req.params['id'];
    var msg;
    ProIn.findOneById(id).exec(function(err, proin) {
      if(err) {
        console.error(err.message);
        res.cookie('msg', '内部错误');
        res.redirect('/index');
      }
      if(!proin) {
        res.cookie('msg', '没有该入库单');
        res.redirect('/index');
      }
      var details = proin.details;
      Thenjs.each(details, function(cont, detail, index) {
        Book.findOneById(detail.id).exec(function(err, book) {
          if(err) {
            console.error(err.message);
            cont(new Error('内部错误'));
          }
          if(!book) {
            cont(null);
          }
          book.stock -= parseInt(detail.count);
          book.save(function(err, book) {
            if(err) {
              console.error(err.message);
              cont(new Error('内部错误'));
            }
            cont(null);
          });
        });
      }).then(function(cont) {
        proin.destroy(function(err) {
          if(err) {
            console.error(err.message);
            cont(new Error('内部错误'));
          }
          res.cookie('msg', '删除成功');
          return res.redirect('/proin/1');
        });
      }).fail(function(cont, err) {
         res.cookie(err.message);
         return res.redirect('/index');
      });
    });
  },

  //更新入库单
  update: function(req, res) {

  },

  //按属性搜索入库单
  findByAtt: function(req, res) {

  }
};
