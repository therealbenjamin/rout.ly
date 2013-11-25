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
    var offer1 = new Offer(req.body);
    Offer.find(function(err, offers){
      for (var i = 0; i < offers.length; i++) {
        m.compareOffers(offer1, offers[i]);
      };
    });
      res.redirect('/offer/' + offer1.id);
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
