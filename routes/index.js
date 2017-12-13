var express = require('express');
var router = express.Router();
var expressSession = require('express-session');
var mongoose = require('mongoose');
var Message = mongoose.model('Message');

var users = require('../controllers/users_controller');
console.log("before / Route");
router.get('/', function(req, res){
    console.log("/ Route");
//    console.log(req);
    console.log(req.session);
    if (req.session.user) {
      console.log("/ Route if user");
      res.render('index', {username: req.session.username,
                           msg:req.session.msg,
                           color:req.session.color});
    } else {
      console.log("/ Route else user");
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});
router.get('/user', function(req, res){
    console.log("/user Route");
    if (req.session.user) {
      res.render('user', {msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});
//router.get('/profiles', function (req, res, next) {
//    console.log("/profiles Route");
//    if(req.session.user){
//      res.render('profiles', {username: req.session.username, msg:req.session.msg});
//    } else {
//	req.session.msg = 'Access Denied!';
//    	res.redirect('/login');
//    }
//});
router.get('/messages', function(req, res, next) {
  Message.find(function(err, messages) {
    if(err) {return next(err); }
    res.json(messages);
  });
});
//router.get('/users', function(req,res,next) {
//  console.log("/users array");
//  User.find(function(err, users) {
//	if(err) {return next(err); }
//	res.json(users);
//  });
//});
router.post('/messages', function(req,res,next) {
  var message = new Message(req.body);
  message.save(function(err, message) {
    if(err) {return next(err); }
    res.json(message);
  });
});
//router.post('/users', function(req,res,next) {
//  var user = new User(req.body);
//  user.save(function(err, user) {
//    if(err) {return next(err); }
//    res.json(user);
//  });
//});

router.param('message', function(req, res, next, id) {
  var query = Message.findById(id);
  query.exec(function (err, message){
    if (err) { return next(err); }
    if (!message) { return next(new Error("can't find message")); }
    req.message = message;
    return next();
  });
});
//router.param('user', function(req, res, next, id) {
//  var query = User.findById(id);
//  query.exec(function (err, user){
//    if (err) { return next(err); }
//    if (!user) { return next(new Error("can't find user")); }
//    req.user = user;
//    return next();
//  });
//});

router.get('/messages/:message', function(req, res) {
  res.json(req.message);
});
//router.get('/users/:user', function(req, res) {
//  res.json(req.user);
//});
router.get('/signup', function(req, res){
    console.log("/signup Route");
    if(req.session.user){
      res.redirect('/');
    }
    res.render('signup', {msg:req.session.msg});
});
router.get('/login',  function(req, res){
    console.log("/login Route");
    if(req.session.user){
      res.redirect('/');
    }
    res.render('login', {msg:req.session.msg});
});
router.get('/logout', function(req, res){
    console.log("/logout Route");
    req.session.destroy(function(){
      res.redirect('/login');
    });
  });
//router.post('/profiles', users.getUserProfile);
router.post('/signup', users.signup);
router.post('/user/update', users.updateUser);
router.post('/user/delete', users.deleteUser);
router.post('/login', users.login);
router.get('/user/profile', users.getUserProfile);

module.exports = router;
