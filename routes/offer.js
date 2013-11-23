var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var Buyer = mongoose.model('Buyer');
var m = require('../lib/mechanics');

exports.index = function(req, res){
  Buyer.findById(req.session.userId, function(err, buyer){
    res.render('offer/index', {title: 'Rout.ly', user:buyer});
  });
};

exports.create = function(req, res){

  Buyer.findById(req.session.userId, function(err, buyer){
    var offer1 = new Offer(req.body);
    Offer.find(function(err, offers){
      for (var i = 0; i < offers.length; i++) {

      };
    });
    res.redirect('/offer/' + offer.id);
  });
};

exports.show = function(req, res){
  Buyer.findById(req.session.userId).populate('offers').exec(function(err, buyer){
    res.render('offer/details', {title: 'Rout.ly', buyer: buyer});
  });
};

exports.retrieve = function(req, res){
  Buyer.findById(req.session.userId).populate('offers').exec(function(err, buyers){
    res.send(buyers);
  });
};

exports.retrieveOne = function(req, res){
  Offer.findById(req.params.id, function(err, offer){
    console.log(offer);
    res.send(offer);
  });
};
