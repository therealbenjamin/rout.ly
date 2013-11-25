var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var Buyer = mongoose.model('Buyer');
var Venue = mongoose.model('Venue');
var m = require('../lib/mechanics');

exports.index = function(req, res){
  Buyer.findById(req.session.userId).populate('venues').exec(function(err, buyer){
    res.render('offer/index', {title: 'Rout.ly', user:buyer, venues: buyer.venues});
  });
};

exports.create = function(req, res){

  Buyer.findById(req.session.userId, function(err, buyer){
    console.log(buyer);
    var offer1 = new Offer(req.body);
    console.log(offer1);
    Offer.find(function(err, offers){
      console.log(offers);
      for (var i = 0; i < offers.length; i++) {
        m.compareOffers(offer1, offers[i], buyer);
      };
    });
      // offer1.save(function(err, offer){
      res.redirect('/overview');
      // });
  });
};

exports.show = function(req, res){
  Buyer.findById(req.session.userId).populate('offers').exec(function(err, buyer){
    res.render('offer/details', {title: 'Rout.ly', buyer: buyer});
  });
};

exports.retrieve = function(req, res){
  Buyer.findById(req.session.userId).populate('offers').exec(function(err, buyer){
     venues = [];
    for (var i = 0; i < buyer.venues.length; i++) {
      Venue.findById(buyer.venues[i], function(err, venue){
        // console.log(venue);
        venues.push(venue);
      }); console.log(venues);
    };
});
};

exports.retrieveOne = function(req, res){
  Offer.findById(req.params.id, function(err, offer){
    console.log(offer);
    res.send(offer);
  });
};
