/**
 * Created by Administrator on 14-8-24.
 */
module.exports = function(req, res, next) {
  console.log(req.target.action);
  if(req.target.action == 'loginview') {
    if (!req.session['user']) {
      return next();
    } else {
      res.cookie('msg', '你已登录');
      return res.redirect('/index');
    }
  } else {
    if (req.session['user']) {
      return next();
    } else {
      res.cookie('msg', '你未登录');
      return res.redirect('/');
    }
  }
};
