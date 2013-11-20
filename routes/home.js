var mongoose = require('mongoose');
var Buyer = mongoose.model('Buyer');

exports.index = function(req, res){
  console.log(req.session.userId);
  Buyer.findById({id:req.session.userId}, function(err, buyer){
    console.log(buyer);
    res.render('home/index', {title: 'Rout.ly', user: buyer});
  });
};
