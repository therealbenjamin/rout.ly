var mongoose = require('mongoose');
// var Offer = mongoose.model('Offer');
// var gm = require('googlemaps');
var geodist = require('geodist');
var moment = require('moment');
var Venue = mongoose.model('Venue');
var moment = require('moment');
var m = require('moment-range');
var twix = require('twix');
var async = require('async');



exports.compareOffers = function(offer1, offer2, buyer){
  async.waterfall([

    ]);

  console.log(buyer);
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
            console.log('OFFER 2 IS NOT CONFIRMED');

            offer1.conflicts.push(offer2.id);
            // console.log(offer1.conflicts);

            offer2.conflicts.push(offer1.id);
            // console.log(offer2.conflicts);

            offer1.save(function(err, offer){
              console.log(offer1.conflicts);
            });

            buyer.offers.push(offer1);
            buyer.save(function(err, buyer){
              console.log('----------------this is save 1--------------');
            });

            offer2.save(function(err, offer){
                console.log(offer2.conflicts);
              });

          } else {
            res.render('offer/rejected');
          }
        }
      // else {
      //     console.log('its far away');
      //     offer1.save(function(err, offer){
      //     });
      //     buyer.offers.push(offer1);
      //     buyer.save(function(err, buyer){
      //       console.log('----------------this is save 2--------------');
      //     });
      //   }
      }
    });
  });
};