var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');

exports.create = function(req, res){
  res.render('account/create', {title: 'Rout.ly'});
};

exports.overview = function(req, res){
Offer.find(function(err, offers){
  res.render('account/overview', {title: 'Rout.ly', offers: offers});
  });
};

exports.new = function(req, res){
  res.redirect('/overview');
};