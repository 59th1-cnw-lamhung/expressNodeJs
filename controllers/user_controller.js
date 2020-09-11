var db = require('../db');
var shortid = require('shortid');
var md5 = require('md5');


//var User = require('../models/user_model');

/*module.exports.create = function(req, res) {
  if (!req.body.email || !req.body.password || !req.body.name) {
      return res.status(400).send({
      message: "Required field can not be empty",
    });
  }

  const user = new User({
    email: req.body.email,
    //password: bcrypt.hashSync(req.body.password, 10),
    password: md5(req.body.password),
    name: req.body.name,
    age: req.body.age,
    avatar: req.body.gender,
    id: shortid.generate(),
  });

  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
}


module.exports.index = async function(req, res) {
    

    var users = await Product.find();

    res.render('users/index', {
        users: users
    });
}*/


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

  var data = {
      email: req.body.email,
      password: md5(req.body.password),
      name: req.body.name,
      age: req.body.age,
      avatar: req.file.path.split('\\').slice(1).join('/'),
      id: shortid.generate()
      
  };
  //console.log(data);
  db.get('users').push(data).write();
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