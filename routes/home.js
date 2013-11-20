var mongoose = require('mongoose');
var Buyer = mongoose.model('Buyer');

exports.index = function(req, res){
  console.log(req.session.userId);
  Buyer.findById(req.session.userId, function(err, buyer){
    console.log(err);
    console.log(buyer);
    res.render('home/index', {title: 'Rout.ly', user: buyer});
  });
};
