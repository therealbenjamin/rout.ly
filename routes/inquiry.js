var mongoose = require('mongoose');
var Buyer = mongoose.model('Buyer');

exports.index = function(req, res){
  Buyer.findById(req.body.userId, function(err, buyer){
    res.render('inquiry/index', {title: 'Rout.ly', user: buyer});
  });
};