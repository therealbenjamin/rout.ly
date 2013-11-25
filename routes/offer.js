var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var Buyer = mongoose.model('Buyer');
var m = require('../lib/mechanics');

exports.index = function(req, res){
  Buyer.findById(req.session.userId).populate('venues').exec(function(err, buyer){
    res.render('offer/index', {title: 'Rout.ly', user:buyer, venues: buyer.venues});
  });
};

exports.create = function(req, res){

  Buyer.findById(req.session.userId, function(err, buyer){

    var offer1 = new Offer(req.body);
    // console.log(offer1);
    Offer.find(function(err, offers){
      if (offers.length) {
      for (var i = 0; i < offers.length; i++) {
        m.compareOffers(offer1, offers[i], buyer);
      }
      } else {
        offer1.save(function(err, offer){
          // console.log(offer);
        });
        buyer.offers.push(offer1);
        buyer.save(function(err, buyer){

        });
      }
    });
      res.redirect('/overview');
  });
};

exports.show = function(req, res){
  Buyer.findById(req.session.userId).populate('offers').exec(function(err, buyer){
    res.render('offer/details', {title: 'Rout.ly', buyer: buyer});
  });
};

exports.retrieve = function(req, res){
  Buyer.findById(req.session.userId).populate('offers').exec(function(err, buyer){
    res.send(buyer);
  });
};

exports.retrieveOne = function(req, res){
  Offer.findById(req.params.id, function(err, offer){
    console.log(offer);
    res.send(offer);
  });
};
