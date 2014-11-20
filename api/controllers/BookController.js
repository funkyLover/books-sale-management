/**
 * BookController
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
  //按id获取书本信息
  find: function(req, res) {

  },

  //新建书本
  create: function(req, res) {
    console.log('book create');
    var bookid = req.body['bookid'];
    var title = req.body['title'];
    var author = req. body['author'];
    var press = req.body['press'];
    var edition = req.body['edition'];
    var price = req.body['price'];
    var facultyId = req.body['faculty'];
    /*先检查是否有书号相同且版次相同的书*/
    Book.find({
      bookId: bookid
    }).done(function (err, books) {
      if(err) {
        res.cookie('msg', '内部错误');
        return res.redirect('/index');
      }
      //检查相同书号情况下有没有相同的版次
      for(var i = 0; i<books.length; i++) {
        if(books[i].edition == edition && books[i].title == title) {
          res.cookie('msg', '资料库已有记录');
          return res.redirect('/book/view/' + books[i].id);
        }
      }
      /*没有该书号的资料库 和 没有版次书号相同的资料库 则create*/
      Faculty.findOne({
        id: facultyId
      }).done(function (err, faculty) {
            if(err) {
              console.error(err.message);
              res.cookie('msg', '内部错误');
              return res.redirect('/index');
            }
            if(!faculty) {
              res.cookie('msg', '没有该学院');
              return res.redirect('/index');
            }
            Book.create({
              bookId: bookid,
              title: title,
              author: author,
              press: press,
              edition: edition,
              price: price,
              faculty: facultyId,
              fname: faculty.name
            }).done(function (err, book) {
                  if(err) {
                    res.cookie('msg', '内部错误');
                    return res.redirect('/index');
                  }
                  if(!book) {
                    res.cookie('msg', '新建资料库失败');
                    return res.redirect('/index');
                  }
                  res.cookie('msg', '新建资料库成功');
                  return res.redirect('/book/view/' + book.id);
                });

          });

        });
  },

  //删除书本
  destroy: function(req, res) {
    var id = req.params['id'];
    Book.findOne({
      id: id
    }).done(function (err, book) {
          if(err) {
            console.error(err.message);
            res.cookie('msg', '内部错误');
            return res.redirect('/index');
          }
          if(!book) {
            res.cookie('msg', '没有该书本');
            return res.redirect('/index');
          }
          if(book.stock != 0) {
            res.cookie('msg', '库存不为0,不能删除');
            return res.redirect('/book/1');
          }
          book.destroy(function (err) {
            if(err) {
              res.cookie('msg', '内部错误');
              return res.redirect('/book/1');
            }
            res.cookie('msg', '删除成功');
            return res.redirect('/book/1');
          });
        });
  },

  //更新书本信息
  update: function(req, res) {
    console.log('book update');
    var id = req.params['id'];
    var bookid = req.body['bookid'];
    var title = req.body['title'];
    var author = req. body['author'];
    var press = req.body['press'];
    var edition = req.body['edition'];
    var price = req.body['price'];
    var facultyId = req.body['faculty'];
    Book.findOne({
      id: id
    }).done(function (err, book) {
          if(err) {
            res.cookie('msg', '内部错误');
            return res.redirect('/index');
          }
          if(!book) {
            res.cookie('msg', '没有该书本');
            return res.redirect('/index');
          }
          Faculty.findOne({
            id: facultyId
          }).done(function (err, faculty) {
                if(err) {
                  console.error(err.message);
                  res.cookie('msg', '内部错误');
                  return res.redirect('/index');
                }
                if(!faculty) {
                  res.cookie('msg', '更新失败,没有该学院代号');
                  return res.redirect('/index');
                }
                book.bookId = bookid;
                book.title = title;
                book.author = author;
                book.press = press;
                book.edition = edition;
                book.price = price;
                book.faculty = faculty.id;
                book.fname = faculty.name;
                book.save(function (err) {
                  if(err) {
                    res.cookie('msg', '更新失败');
                    return res.redirect('/index');
                  }
                  res.cookie('msg', '更新成功');
                  return res.redirect('/book/view/' + book.id);
                });

              });
        });
  },

  //库存清零
  stockToZero: function(req, res) {
    if(!req.session['user'].isAdmin) {
      res.cookie('msg', '没有权限');
      return res.redirect('/index');
    }
    var id = req.params['id'];
    Book.findOne({
      id: id
    }).done(function (err, book) {
          if(err) {
            console.error(err.message);
            res.cookie('msg', '内部错误');
            return res.redirect('/index');
          }
          if(!book) {
            res.cookie('msg', '没有该书本');
            return res.redirect('/book/1');
          }
          book.stock = 0;
          book.save(function (err) {
            if(err) {
              console.error(err.message);
              res.cookie('msg', '内部错误');
              return res.redirect('/index');
            }
            res.cookie('msg', '清零成功');
            return res.redirect('/book/stock/' + book.id);
          });
        });
  },

  //清算
  account: function(req, res) {
    if(!req.session['user'].isAdmin) {
      res.cookie('msg', '没有权限');
      return res.redirect('/index');
    }
    var id = req.params['id'];
    var stockByCount = req.body['stockbycount'];
    var pal;
    Book.findOne({
      id: id
    }).done(function (err, book) {
          if(err) {
            console.error(err.message);
            res.cookie('msg', '内部错误');
            return res.redirect('/index');
          }
          if(!book) {
            res.cookie('msg', '没有该书本');
            return res.redirect('/book/1');
          }
          pal = stockByCount - book.stock;
          book.stockByCount = stockByCount;
          book.pal = pal;
          book.palm = pal * book.price;
          book.save(function (err) {
            if(err) {
              console.error(err.message);
              res.cookie('msg', '内部错误');
              return res.redirect('/index');
            }
            res.cookie('msg', '清点成功');
            return res.redirect('/book/stock/'+book.id);
          });
        });
  },

  //按属性搜索书本
  findByAtt: function(req, res) {

  },

  //ajax请求下查找书本信息,辅助入库单出库单模块
  getByBookId: function(req, res) {
    if(!req.isAjax) {
      return res.send({ error: 1, msg: '违规操作'});
    }
    var bookid = req.params['bookid'];
    Book.findByBookId(bookid).exec(function(err, books) {
      if(err) {
        return res.send({ error: 1, msg: '内部错误'});
      }
      if(books.length == 0) {
        return  res.send({ none: 1, msg: '没有该书号,请重新输入'});
      }
      for(var i=0; i<books.length; i++) {
        for(var j=i+1; j<books.length; j++) {
          if(books[i].title == books[j].title) {
            books.splice(j, 1);
          }
        }
      }
      return res.send({ ok: 1, books: books});
    })
  },

  getByTitle: function(req, res) {
    if(!req.isAjax) {
      return res.send({ error: 1, msg: '违规操作'});
    }
    var bookid = req.params['bookid'];
    var title = req.params['title'];
    console.log(bookid, title);
    Book.find({ bookId: bookid, title: title}).exec(function(err, books) {
      if(err) {
        return res.send({ error: 1, msg: '内部错误'});
      }
      if(books.length == 0) {
        return res.send({ none: 1, msg: '没有该书号及书名的书本,请重新输入'});
      }
      for(var i=0; i<books.length; i++) {
        for(var j=i+1; j<books.length; j++) {
          if(books[i].edition == books[j].edition) {
            books.splice(j, 1);
          }
        }
      }
      return res.send({ ok: 1, books: books});
    });
  },

  getByEdition: function(req, res) {
    if(!req.isAjax) {
      return res.send({ error: 1, msg: '违规操作'});
    }

    var bookid = req.params['bookid'];
    var title = req.params['title'];
    var edition = req.params['edition'];

    Book.findOne({bookId: bookid, title: title, edition: edition}).exec(function(err, book) {
      if(err) {
        return res.send({error: 1, msg: '内部错误'});
      }
      if(!book) {
        return res.send({none: 1, msg: '没有该书本,请重新输入'});
      }
      return res.send({ok: 1, book: book});
    });
  }

};
