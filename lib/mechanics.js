var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var gm = require('googlemaps');
var util = require('util');
var geodist = require('geodist');
var Venue = mongoose.model('Venue');

exports.compareOfferAddresses = function(offer1, offer2){
  Venue.findById(offer1.venue, function(err, venue1){
    Venue.findById(offer2.venue, function(err, venue2){
      var dist = geodist({lat:venue1.lat, lon:venue1.lng}, {lat:venue2.lat, lon:venue2.lng});
      if (dist < offer2.radius) {
        console.log('its too close');
        //HERE IS WHERE YOU WANT TO COMPARE DATES OF MATCHING OFFERS
      }
    });
  });
}