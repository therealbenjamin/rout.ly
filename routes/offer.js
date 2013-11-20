var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
// var Buyer = mongoose.model('Buyer');
// var User = mongoose.model('User');

exports.index = function(req, res){
  res.render('offer/index', {title: 'Rout.ly'});
};

exports.create = function(req, res){
  var offer = new Offer(req.body);
  offer.save(function(err, offer){
    res.redirect('/offer/' + offer.id);
  });
};

exports.show = function(req, res){
  console.log(req.params.id);
  Offer.findById(req.params.id, function(err, offer){
    console.log(offer);
    console.log(err);
    res.render('offer/details', {title: 'Rout.ly', offer: offer});
  });
};