var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var Buyer = mongoose.model('Buyer');
// var User = mongoose.model('User');

exports.index = function(req, res){
  res.render('offer/index', {title: 'Rout.ly'});
};

exports.create = function(req, res){
  Buyer.findById(req.session.userId, function(err, buyer){
    console.log(buyer);
    var offer = new Offer(req.body);
    buyer.populate('offers').exec(function(err, offer){
      buyer.offers.push(offer);
      buyer.save(function(err, buyer){
        res.redirect('/offer/' + offer.id);
      });
    });
  });
};

exports.show = function(req, res){
  Buyer.findById(req.params.id, function(err, buyer){
    res.render('offer/details', {title: 'Rout.ly', buyer: buyer});
  });
};