
var Product = require('../../models/product_model');

module.exports.index = async function(req, res) {
  try{
      var products = await Product.find();
      res.json(products);
  }   catch (error) {
      res.status(500).send(error);
  }  
      
};

module.exports.create = async function(req, res) {
    try{
        var product = await Product.create(req.body);
        res.json(product);
    } catch (error) {
        res.status(500).send(error);
    }
  
};

module.exports.find = async function(req, res) {
    try {
        var product = await Product.findById(req.params.id).exec();
        res.json(product);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports.edit = async function(request, response) {
    try {
        var product = await Product.findById(request.params.id).exec();
        product.set(request.body);
        var result = await product.save();
        response.json(result);
    } catch (error) {
        response.status(500).send(error);
    }
};

module.exports.delete = async function(request, response) {
    try {
        var result = await Product.deleteOne({ _id: request.params.id }).exec();
        response.json(result);
    } catch (error) {
        response.status(500).send(error);
    }
};
