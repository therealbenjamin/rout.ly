var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var gm = require('googlemaps');
var geodist = require('geodist');
var moment = require('moment');
var moment = require('moment');
var twix = require('twix');
var Venue = mongoose.model('Venue');

exports.compareOffers = function(offer1, offer2){
  Venue.findById(offer1.venue, function(err, venue1){
    Venue.findById(offer2.venue, function(err, venue2){
      var dist = geodist({lat:venue1.lat, lon:venue1.lng}, {lat:venue2.lat, lon:venue2.lng});
      if (dist < offer2.radius) {

        console.log('its too close');

        var startDate1 = moment(new Date(offer1.showDate));
        startDate1.subtract('days', offer1.daysPrior);

        var endDate1 = moment(new Date(offer1.showDate));
        endDate1.add('days', offer1.daysAfter);

        var start = startDate1;
        var end = endDate1;
        var range = moment.twix(start, end);


        var startDate2 = moment(new Date(offer2.showDate));
        startDate2.subtract('days', offer2.daysPrior);

        var endDate2 = moment(new Date(offer2.showDate));
        endDate2.add('days', offer2.daysAfter);

        var start2 = startDate2;
        var end2 = endDate2;
        var range2 = moment().twix(start2, end2);


        var overlap = range.overlaps(range2);

        if(overlap){
          if(!offer2.isConfirmed){
            offer1.conflicts.push(offer2.id);
            offer2.conflicts.push(offer1.id);
            offer1.save(function(err, offer){
              offer2.save(function(err, offer){
                console.log(offer1.conflicts);
                console.log(offer2.conflicts);
              });
            })
          } else {
            return 'sorry charlie';
          }
        }
      }
    });
  });
}