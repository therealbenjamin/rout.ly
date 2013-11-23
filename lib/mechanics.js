var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var gm = require('googlemaps');
var util = require('util');
var geodist = require('geodist');
var moment = require('moment');
var Venue = mongoose.model('Venue');

exports.compareOffers = function(offer1, offer2){
  Venue.findById(offer1.venue, function(err, venue1){
    Venue.findById(offer2.venue, function(err, venue2){
      var dist = geodist({lat:venue1.lat, lon:venue1.lng}, {lat:venue2.lat, lon:venue2.lng});
      if (dist < offer2.radius) {
        var priorDate = moment().subtract('days', venue1.daysPrior);
        console.log(priorDate);
        var afterDate = moment().add('days', venue1.daysAfter);
        console.log(afterDate);

        //HERE IS WHERE YOU WANT TO COMPARE DATES OF MATCHING OFFERS
      }
    });
  });
}