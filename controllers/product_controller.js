
var Product = require('../models/product_model');
//var db = require('../db');
module.exports.index = async function(req, res, next) {
  /*var page = parseInt(req.query.page) || 1;
  var perPage = 8;
  var start = (page - 1) * perPage;
  var end = page * perPage;


  var arr = [];
  var totalproduct = Math.ceil(db.get('products').value().length/perPage);
  if(page === 1) {
      arr.push(page, page + 1, page + 2, 'Next', 'Last');
  }
  if(page > 1 && page < totalproduct) {
      arr.push('First','Prev', page - 1, page, page + 1, 'Next', 'Last');
  }

  if(page === totalproduct) {
      arr.push('First', 'Prev', page - 2, page - 1, page);
  }

  res.render('products/index', {
      products: db.get('products').value().slice(start, end),
      page: page,
      totalPages: arr,
      lastPage: totalproduct
  });*/

  try{
    var products = await Product.find();
    //product.hung();
    res.render('products/index', {
          products: products
    });
  } catch(error){
    next(error);
  }

  



/*

    res.render('products/index', {
        products: db.get('products').value().slice(start, end)
    });*/
}

/*module.exports.search = function(req, res){
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matchedUsers
    });
}*/

/*module.exports.create = function(req, res) {
    console.log(req.cookies);
    res.render('products/create')//view
}

module.exports.getId = function(req, res){
    var id1 = (req.params.userid);// chỗ này không cần ép kiểu vì trong db.json id để kiểu string (cùng so sánh 2 string hoặc cùng so sánh 2 số mới được)
    
    var product = db.get('products').find({ id: id1 }).value();

    res.render('products/detail', {
        product: product
    });
}

module.exports.postCreate = function(req, res) {
   //req.body.id = shortid.generate();

  req.body = {
      "image": req.body.image,
      "description": req.body.description,
      "name": req.body.name,
      "price": req.body.price,
      "id": shortid.generate(),
      
  };
  console.log(req.body)
  db.get('products').push(req.body).write();
  res.redirect('/products')
}
*/

/*module.exports.editGetId = function(req, res){
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
}*/