var mongoose = require('mongoose');
var Buyer = mongoose.model('Buyer');
var Venue = mongoose.model('Venue');

exports.add = function(req, res){
  Buyer.findById(req.session.userId, function(err, buyer){
    res.render('venue/create', {title: 'Rout.ly', user:buyer});
  });
};
