/**
 * ViewController
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
    
  
  /**
   * Action blueprints:
   *    `/view/controller`
   */
   loginView: function (req, res) {
    //登录页
    return res.view('login');
  },

  indexView: function (req, res) {
    //首页
    return res.view('home/index', {
      user: req.session['user']
    });
  },

  /*入库单*/
  //添加入库单页
  addProinView: function (req, res) {
    return res.view('proin/addproin', {
      user: req.session['user']
    });
  },
  //入库单详情页
  proinView: function (req, res) {
    var id = req.params['id'];
    console.log(id);
    ProIn.findOneById(id).exec(function(err, proin) {
      if(err) {
        console.log(err.message);
        res.cookie('msg', '内部错误');
        return res.redirect('/proin/1');
      }
      if(!proin) {
        res.cookie('msg', '没有该入库单');
        return res.redirect('/proin/1');
      }
      return res.view('proin/proin', {
        user: req.session['user'],
        proin: proin
      });
    });
  },
  //入库单列表
  proinList: function (req, res) {
    var page = req.params['page'];
    ProIn.count().exec(function(err, count) {
      if(err) {
        console.error(err.message);
        res.cookie('msg', '内部错误');
        return res.redirect('/index');
      }
      if(count == 0) {
        return res.view('proin/proins', {
          user: req.session['user'],
          none: 1
        });
      }
      console.log('count:', count);
      ProIn.find().skip(7*(page-1)).limit(7).exec(function (err, proins) {
        if(err) {
          res.cookie('msg', '内部错误');
          return res.redirect('/index');
        }
        console.log(proins);
        if(page == 1 && count>7) {
          return res.view('proin/proins', {
            user: req.session['user'],
            proins: proins,
            page: page,
            next: parseInt(page) + 1
          });
        } else if(page == 1 && count <= 7) {
          return res.view('proin/proins', {
            user: req.session['user'],
            proins: proins,
            page: page
          });
        }else if(page*7 < count) {
          return res.view('proin/proins', {
            user: req.session['user'],
            proins: proins,
            page: page,
            next: parseInt(page) + 1,
            pre: parseInt(page) - 1
          });
        } else if(page*7 == count) {
          return res.view('proin/proins', {
            user: req.session['user'],
            proins: proins,
            page: page,
            pre: parseInt(page) - 1
          });
        } else if(page*7 > count && (page-1)*7 < count){
          return res.view('proin/proins', {
            user: req.session['user'],
            proins: proins,
            page: page,
            pre: parseInt(page) - 1
          });
        } else if((page-1)*7 > count) {
          res.cookie('msg', '没有该页码');
          return res.redirect('/proin/1');
        }
      });
    });
  },

  /*出库单*/
  //添加出库单页
  addProoutView: function (req, res) {
    return res.view('proout/addproout', {
      user: req.session['user']
    });
  },
  //出库单详情页
  prooutView: function (req, res) {
    var id = req.params['id'];
    console.log(id);
    ProOut.findOneById(id).exec(function(err, proout) {
      if(err) {
        console.log(err.message);
        res.cookie('msg', '内部错误');
        return res.redirect('/proout/1');
      }
      if(!proout) {
        res.cookie('msg', '没有该入库单');
        return res.redirect('/proout/1');
      }
      return res.view('proout/proout', {
        user: req.session['user'],
        proout: proout
      });
    });
  },
  //出库单列表
  prooutList: function (req, res) {
    var page = req.params['page'];
    ProOut.count().exec(function(err, count) {
      if(err) {
        console.error(err.message);
        res.cookie('msg', '内部错误');
        return res.redirect('/index');
      }
      if(count == 0) {
        return res.view('proout/proouts', {
          user: req.session['user'],
          none: 1
        });
      }
      console.log('count:', count);
      ProOut.find().skip(7*(page-1)).limit(7).exec(function (err, proouts) {
        if(err) {
          res.cookie('msg', '内部错误');
          return res.redirect('/index');
        }
        console.log(proouts);
        if(page == 1 && count>7) {
          return res.view('proout/proouts', {
            user: req.session['user'],
            proouts: proouts,
            page: page,
            next: parseInt(page) + 1
          });
        } else if(page == 1 && count <= 7) {
          return res.view('proout/proouts', {
            user: req.session['user'],
            proouts: proouts,
            page: page
          });
        }else if(page*7 < count) {
          return res.view('proout/proouts', {
            user: req.session['user'],
            proouts: proouts,
            page: page,
            next: parseInt(page) + 1,
            pre: parseInt(page) - 1
          });
        } else if(page*7 == count) {
          return res.view('proout/proouts', {
            user: req.session['user'],
            proouts: proouts,
            page: page,
            pre: parseInt(page) - 1
          });
        } else if(page*7 > count && (page-1)*7 < count){
          return res.view('proout/proouts', {
            user: req.session['user'],
            proouts: proouts,
            page: page,
            pre: parseInt(page) - 1
          });
        } else if((page-1)*7 > count) {
          res.cookie('msg', '没有该页码');
          return res.redirect('/proout/1');
        }
      });
    });
  },

  //用户个人信息页
  userInfo: function (req, res) {
    return res.view('user/info', {
      user: req.session['user']
    });
  },
  //修改密码页
  userPassword: function (req, res) {
    return res.view('user/password', {
      user: req.session['user']
    });
  },
  //添加用户页
  addUserView: function (req, res) {
    if(!req.session['user'].isAdmin) {
      res.cookie('msg', '你没有权限');
      return res.redirect('/index');
    } else {
      return res.view('user/adduser', {
        user: req.session['user']
      });
    }
  },
  //用户列表页
  userList: function (req, res) {
    if(!req.session['user'].isAdmin) {
      res.cookie('msg', '你没有权限');
      return res.redirect('/index');
    }
    User.find().sort('createdAt').exec(function (err, users) {
      if(err) {
        console.error(err.message);
        res.cookie('msg', '内部错误');
        return res.redirect('/index');
      }
      console.log(users);
      if(users.length == 0) {
        return res.view('user/users', {
          user: req.session['user'],
          none: 1
        });
      }
      if(users.length == 1 && users[0].username == req.session['user'].username) {
        return res.view('user/users', {
          user: req.session['user'],
          me: 1
        });
      }
      for(var i=0;i<users.length;i++) {
        if(users[i].username == req.session['user'].username) {
          users.splice(i, 1);
        }
      }
      return res.view('user/users', {
        user: req.session['user'],
        users: users
      });
    });
  },


  /*书本资料库模块 begin*/
  //添加书本资料库的页面
  addBookView: function (req, res) {
    Faculty.find().sort('id').exec(function (err, faculties) {
      if(err) {
        console.error(err.message);
        res.cookie('msg', '内部错误');
        return res.redirect('/index');
      }
      if(faculties.length == 0) {
        res.view('book/addbook', {
          user: req.session['user'],
          none: 1
        });
      }
      return res.view('book/addbook', {
        user: req.session['user'],
        facultyList: faculties
      });
    });
  },

  //书本资料库列表
  bookList: function (req, res) {
    var page = req.params['page'];
    Book.count().exec(function (err, count) {
      if(err) {
        res.cookie('msg', '内部错误');
        return res.redirect('/index');
      }
      if(count == 0) {
        return res.view('book/books', {
          user: req.session['user'],
          none: 1
        });
      }
      console.log('count' + count);
      Book.find().skip(7*(page-1)).limit(7).exec(function (err, books) {
        if(err) {
          res.cookie('msg', '内部错误');
          return res.redirect('/index');
        }
        console.log(books);
        if(page == 1 && count>7) {
          return res.view('book/books', {
            user: req.session['user'],
            books: books,
            page: page,
            next: parseInt(page) + 1
          });
        } else if(page == 1 && count <= 7) {
          return res.view('book/books', {
            user: req.session['user'],
            books: books,
            page: page
          });
        }else if(page*7 < count) {
          return res.view('book/books', {
            user: req.session['user'],
            books: books,
            page: page,
            next: parseInt(page) + 1,
            pre: parseInt(page) - 1
          });
        } else if(page*7 == count) {
          return res.view('book/books', {
            user: req.session['user'],
            books: books,
            page: page,
            pre: parseInt(page) - 1
          });
        } else if(page*7 > count && (page-1)*7 < count){
          return res.view('book/books', {
            user: req.session['user'],
            books: books,
            page: page,
            pre: parseInt(page) - 1
          });
        } else if((page-1)*7 > count) {
          res.cookie('msg', '没有该页码');
          return res.redirect('/book/1');
        }
      });
    });
  },

  //某一书本资料库信息
  bookView: function (req, res) {
    var id = req.params['id'];
    Book.findOne({
      id: id
    }).done(function (err, book) {
          if(err) {
            res.cookie('msg', '内部错误');
            return res.redirect('/index');
          }
          if(!book) {
            res.cookie('msg', '没有该任务');
            return res.redirect('/index');
          }
          console.log(book);
          Faculty.find().sort('id').exec(function (err, faculties) {
            if(err) {
              console.error(err.message);
              res.cookie('msg', '内部错误');
              return res.redirect('/index');
            }
            return res.view('book/book', {
              user: req.session['user'],
              faculties: faculties,
              book: book
            });
          });

        });
  },

  //书本库存页
  bookStock: function (req, res) {
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
            return res.redirect('index');
          }
          return res.view('book/stock', {
            user: req.session['user'],
            book: book
          })
        });
  },

  /*书本资料库模块 end*/

  /*学院模块 begin*/
  //添加学院页面
  addFacultyView: function (req, res) {
    return res.view('faculty/addfaculty', {
      user: req.session['user']
    });
  },

  //学院信息列表
  facultyList: function (req, res) {
    Faculty.find().sort('id').exec(function (err, faculties) {
      if(err) {
        console.error(err.message);
        res.cookie('msg', '内部错误');
        return res.redirect('/index');
      }
      if(faculties.length == 0) {
        res.view('faculty/faculties', {
          user: req.session['user'],
          none: 1
        });
      }
      console.log(faculties);
      return res.view('faculty/faculties', {
        user: req.session['user'],
        facultyList: faculties
      })
    });
  },
  /*学院模块 end*/

  /*搜索功能页*/
  searchView: function(req, res) {
    return res.view('search/search', {
      user: req.session['user']
    });
  }
};
