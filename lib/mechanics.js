var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var gm = require('googlemaps');
var geodist = require('geodist');
var Venue = mongoose.model('Venue');
var moment = require('moment');


exports.compareOfferAddresses = function(offer1, offer2){
  Venue.findById(offer1.venue, function(err, venue1){
    Venue.findById(offer2.venue, function(err, venue2){
      var dist = geodist({lat:venue1.lat, lon:venue1.lng}, {lat:venue2.lat, lon:venue2.lng});
      if (dist < offer2.radius) {
        console.log('its too close');

        var startDate = moment(new Date(offer1.showDate));
        console.log(startDate._d);

        var priorDate = startDate.subtract('days', offer1.daysPrior);
        console.log(priorDate._d);

        var afterDate = startDate.add('days', offer1.daysPrior).add('days', offer1.daysAfter);

        console.log(afterDate._d);

        //HERE IS WHERE YOU WANT TO COMPARE DATES OF MATCHING OFFERS
      }
    });
  });
}