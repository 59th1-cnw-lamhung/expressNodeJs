var shortid = require('shortid');
var md5 = require('md5');
var db = require('../db');

module.exports.index = function(req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    });
}

module.exports.search = function(req, res){
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matchedUsers
    });
}

module.exports.create = function(req, res) {
    console.log(req.cookies);
    res.render('users/create')//view
}

module.exports.getId = function(req, res){
    var id1 = (req.params.userid);// chỗ này không cần ép kiểu vì trong db.json id để kiểu string (cùng so sánh 2 string hoặc cùng so sánh 2 số mới được)
    
    var user = db.get('users').find({ id: id1 }).value();

    res.render('users/detail', {
        user: user
    });
}

module.exports.postCreate = function(req, res) {
   //req.body.id = shortid.generate();

  req.body = {
      "email": req.body.email,
      "password": md5(req.body.password),
      "name": req.body.name,
      "age": req.body.age,
      "id": shortid.generate(),
      
  };
  console.log(req.body)
  db.get('users').push(req.body).write();
  res.redirect('/users')
}


module.exports.editGetId = function(req, res){
    var id1 = (req.params.editid);
    
    var user = db.get('users').find({ id: id1 }).value();

    res.render('users/edit', {
        user: user
    });
}

module.exports.postEdit = function(req, res) {
   req.body.id = shortid.generate();
   db.get('users').update(req.body).write();
   res.redirect('/users')
}

/*module.exports.getDelete = function(req, res) {
    res.render('users/index')//view
}

module.exports.delete = function(req, res) {
 var id = req.params.id;
 
 delete db.get('users').find({ id: id1 }).value();
 
 res.redirect('/users');
};*/