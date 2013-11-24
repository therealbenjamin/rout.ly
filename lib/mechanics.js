var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var gm = require('googlemaps');
var geodist = require('geodist');
var moment = require('moment');
var Venue = mongoose.model('Venue');
var moment = require('moment');


exports.compareOffers = function(offer1, offer2){
  Venue.findById(offer1.venue, function(err, venue1){
    Venue.findById(offer2.venue, function(err, venue2){
      var dist = geodist({lat:venue1.lat, lon:venue1.lng}, {lat:venue2.lat, lon:venue2.lng});
      if (dist < offer2.radius) {

        console.log('its too close');

        var startDate1 = moment(new Date(offer1.showDate));
        startDate1.subtract('days', offer1.daysPrior);
        var showDate1 = moment(new Date(offer1.showDate));
        var endDate1 = moment(new Date(offer1.showDate));
        endDate1.add('days', offer1.daysAfter);

        console.log(startDate1._d);
        console.log(showDate1._d);
        console.log(endDate1._d);


        //HERE IS WHERE YOU WANT TO COMPARE DATES OF MATCHING OFFERS
      }
    });
  });
}