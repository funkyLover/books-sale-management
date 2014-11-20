/**
 * Routes
 *
 * Sails uses a number of different strategies to route requests.
 * Here they are top-to-bottom, in order of precedence.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */



/**
 * (1) Core middleware
 *
 * Middleware included with `app.use` is run first, before the router
 */


/**
 * (2) Static routes
 *
 * This object routes static URLs to handler functions--
 * In most cases, these functions are actions inside of your controllers.
 * For convenience, you can also connect routes directly to views or external URLs.
 *
 */

module.exports.routes = {

  // By default, your root route (aka home page) points to a view
  // located at `views/home/index.ejs`
  // 
  // (This would also work if you had a file at: `/views/home.ejs`)
  '/': {
    controller: 'view',
    action: 'loginView'
  },

  '/index': {
    controller: 'view',
    action: 'indexView'
  },


  //登陆
  'post /login': {
    controller: 'state',
    action: 'login'
  },

  //登出
  '/logout': {
    controller: 'state',
    action: 'logout'
  },

  /*入库单模块*/
  //添加入库单页
  '/proin/create': {
    controller: 'view',
    action: 'addProinView'
  },
  //入库单信息
  '/proin/view/:id': {
    controller: 'view',
    action: 'proinView'
  },
  //入库单列表
  'get /proin/:page': {
    controller: 'view',
    action: 'proinList'
  },
  //添加入库单
  'post /proin': {
    controller: 'proIn',
    action: 'create'
  },
  //删除入库单
  '/proin/delete/:id': {
    controller: 'proIn',
    action: 'destroy'
  },
  /*出库单模块*/
  //添加出库单页
  '/proout/create': {
    controller: 'view',
    action: 'addProoutView'
  },
  //添加出库单
  'post /proout': {
    controller: 'proOut',
    action: 'create'
  },
  //删除出库单
  '/proout/delete/:id': {
    controller: 'proOut',
    action: 'destroy'
  },
  //出库单信息
  '/proout/view/:id': {
    controller: 'view',
    action: 'prooutView'
  },
  //出库单列表
  'get /proout/:page': {
    controller: 'view',
    action: 'prooutList'
  },
  //改变出库单支付状态
  '/proout/pay/:id': {
    controller: 'proOut',
    action: 'pay'
  },
  //更新领用人信息
  '/proout/client/:id': {
    controller: 'proOut',
    action: 'update'
  },

  /*ajax*/
  '/bookid/:bookid': {
    controller: 'book',
    action: 'getByBookId'
  },

  '/title/:bookid/:title': {
    controller: 'book',
    action: 'getByTitle'
  },

  '/edition/:bookid/:title/:edition': {
    controller: 'book',
    action: 'getByEdition'
  },

  /*用户模块*/
  //用户个人信息页
  '/user/info': {
    controller: 'view',
    action: 'userInfo'
  },
  //修改密码页
  '/user/password': {
    controller:'view',
    action: 'userPassword'
  },
  //修改个人信息
  'put /user/:id': {
    controller: 'user',
    action: 'modiInfo'
  },
  //修改密码
  'put /user/password/:id': {
    controller: 'user',
    action: 'changePassword'
  },
  //添加用户页
  '/user/create': {
    controller: 'view',
    action: 'addUserView'
  },
  //用户列表页
  'get /user': {
    controller: 'view',
    action: 'userList'
  },
  //添加用户
  'post /user': {
    controller: 'user',
    action: 'create'
  },
  //删除用户
  '/user/delete/:id': {
    controller: 'user',
    action: 'destroy'
  },

  /*书本模块*/
  //添加书本页面
  '/book/create': {
    controller: 'view',
    action: 'addBookView'
  },

  //书本资料库列表
  'get /book/:page': {
    controller: 'view',
    action: 'bookList'
  },

  //某一书本资料库
  '/book/view/:id': {
    controller: 'view',
    action: 'bookView'
  },

  //添加书本
  'post /book': {
    controller: 'book',
    action: 'create'
  },

  //删除书本资料库
  '/book/delete/:id': {
    controller: 'book',
    action: 'destroy'
  },

  //修改书本信息
  'put /book/:id': {
    controller: 'book',
    action: 'update'
  },

  //书本库存页
  'get /book/stock/:id': {
    controller: 'view',
    action: 'bookStock'
  },

  //清算
  'put /book/stock/:id': {
    controller: 'book',
    action: 'account'
  },

  //库存清零
  '/book/stocktozero/:id': {
    controller: 'book',
    action: 'stockToZero'
  },

  /*学院模块*/
  //添加学院信息页面
  '/faculty/create': {
    controller: 'view',
    action: 'addFacultyView'
  },

  //学院列表页面
  'get /faculty': {
    controller: 'view',
    action: 'facultyList'
  },

  'post /faculty': {
    controller: 'faculty',
    action: 'create'
  },

  '/faculty/delete/:id': {
    controller: 'faculty',
    action: 'destroy'
  },

  'put /faculty/:id': {
    controller: 'faculty',
    action: 'update'
  },

  /*搜索功能模块*/
  '/search': {
    controller: 'view',
    action: 'searchView'
  },

  '/search/proin': {
    controller: 'search',
    action: 'proin'
  },

  '/search/proout': {
    controller: 'search',
    action: 'proout'
  },

  '/search/book': {
    controller: 'search',
    action: 'book'
  }


  /*
  // But what if you want your home page to display
  // a signup form located at `views/user/signup.ejs`?
  '/': {
    view: 'user/signup'
  }


  // Let's say you're building an email client, like Gmail
  // You might want your home route to serve an interface using custom logic.
  // In this scenario, you have a custom controller `MessageController`
  // with an `inbox` action.
  '/': 'MessageController.inbox'


  // Alternatively, you can use the more verbose syntax:
  '/': {
    controller: 'MessageController',
    action: 'inbox'
  }


  // If you decided to call your action `index` instead of `inbox`,
  // since the `index` action is the default, you can shortcut even further to:
  '/': 'MessageController'


  // Up until now, we haven't specified a specific HTTP method/verb
  // The routes above will apply to ALL verbs!
  // If you want to set up a route only for one in particular
  // (GET, POST, PUT, DELETE, etc.), just specify the verb before the path.
  // For example, if you have a `UserController` with a `signup` action,
  // and somewhere else, you're serving a signup form looks like: 
  //
  //		<form action="/signup">
  //			<input name="username" type="text"/>
  //			<input name="password" type="password"/>
  //			<input type="submit"/>
  //		</form>

  // You would want to define the following route to handle your form:
  'post /signup': 'UserController.signup'


  // What about the ever-popular "vanity URLs" aka URL slugs?
  // (you might remember doing this with `mod_rewrite` in Apache)
  //
  // This is where you want to set up root-relative dynamic routes like:
  // http://yourwebsite.com/twinkletoez
  //
  // NOTE:
  // You'll still want to allow requests through to the static assets,
  // so we need to set up this route to ignore URLs that have a trailing ".":
  // (e.g. your javascript, CSS, and image files)
  'get /*(^.*)': 'UserController.profile'

  */
};



/** 
 * (3) Action blueprints
 * These routes can be disabled by setting (in `config/controllers.js`):
 * `module.exports.controllers.blueprints.actions = false`
 *
 * All of your controllers ' actions are automatically bound to a route.  For example:
 *   + If you have a controller, `FooController`:
 *     + its action `bar` is accessible at `/foo/bar`
 *     + its action `index` is accessible at `/foo/index`, and also `/foo`
 */


/**
 * (4) Shortcut CRUD blueprints
 *
 * These routes can be disabled by setting (in config/controllers.js)
 *			`module.exports.controllers.blueprints.shortcuts = false`
 *
 * If you have a model, `Foo`, and a controller, `FooController`,
 * you can access CRUD operations for that model at:
 *		/foo/find/:id?	->	search lampshades using specified criteria or with id=:id
 *
 *		/foo/create		->	create a lampshade using specified values
 *
 *		/foo/update/:id	->	update the lampshade with id=:id
 *
 *		/foo/destroy/:id	->	delete lampshade with id=:id
 *
 */

/**
 * (5) REST blueprints
 *
 * These routes can be disabled by setting (in config/controllers.js)
 *		`module.exports.controllers.blueprints.rest = false`
 *
 * If you have a model, `Foo`, and a controller, `FooController`,
 * you can access CRUD operations for that model at:
 *
 *		get /foo/:id?	->	search lampshades using specified criteria or with id=:id
 *
 *		post /foo		-> create a lampshade using specified values
 *
 *		put /foo/:id	->	update the lampshade with id=:id
 *
 *		delete /foo/:id	->	delete lampshade with id=:id
 *
 */

/**
 * (6) Static assets
 *
 * Flat files in your `assets` directory- (these are sometimes referred to as 'public')
 * If you have an image file at `/assets/images/foo.jpg`, it will be made available
 * automatically via the route:  `/images/foo.jpg`
 *
 */



/**
 * (7) 404 (not found) handler
 *
 * Finally, if nothing else matched, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 */
 
