var express = require('express');
var router = express.Router();
var bodyParser  = require('body-parser');
var User = require('../models/user'); //user  가 뭔지 소환
var http = require('http');
var path = require('path');
// middleware that is specific to this router


router.post('/make_user', function(req, res) {
  new User({name : req.body.name,nickname :req.body.nickname}).save(
    function(err, prd){
    if(err) res.json(err);
    else    res.send("Product Successfully Added !");
  });
  // var rname = req.body.name
  // var rnickname =req.body.nickname
  // var newUser = User({
  //   name: rname
  //   nickname: rnickname,
  //   sex: 'man'
  // });
  // newUser.save(function(err) {
  // if (err) throw err;
  // console.log('User saved successfully!');
  // });
  // res.send('ok');
});

router.get('/index', function(req, res) {
  res.cookie('count', 1);
  res.render('index.ejs' ,{last_name : 'kim', first_name : 'seunghoe'});

});

router.get('/user_all', function(req, res) {


  User.find({}, function(err, all_users) {
    if (err) throw err;

    res.render('user_all.ejs' , {users : all_users});

  });



});

router.get('/modify_user/:id',function(req,res){

  User.findById(req.params.id, function(err, users) {
  // change the users location
  users.name = 'changed';
  users.save();
  res.redirect('/user_all');
  });
});


module.exports = router;
