var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');

exports.index = function(req, res){
  res.render('offer/index', {title: 'Rout.ly'});
};


exports.show = function(req, res){
  res.render('offer/update', {title: 'Rout.ly'});
};

exports.details = function(req, res){
  var offer = new Offer(req.body);
  offer.save(function(err, offer){
    console.log(offer);
    res.redirect('/offerdetails');
  });
};