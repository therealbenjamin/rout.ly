var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var gm = require('googlemaps');
var geodist = require('geodist');
var moment = require('moment');
var Venue = mongoose.model('Venue');
var moment = require('moment');
var m = require('moment-range');
var twix = require('twix');



exports.compareOfferDistance = function(offer1, offer2, buyer, offers, datacount, fn){
  Venue.findById(offer1.venue, function(err, venue1){
    Venue.findById(offer2.venue, function(err, venue2){
      console.log('waterfall1');

      var dist = geodist({lat:venue1.lat, lon:venue1.lng}, {lat:venue2.lat, lon:venue2.lng});
      var data = {};
      data.count = datacount;

      data.offer1 = offer1;
      data.offer2 = offer2;
      data.venue1 = venue1;
      data.venue2 = venue2;
      data.buyer = buyer;
      data.dist = dist;
      data.offerLength = offers.length;

      fn(null, data);
    });
  });
}

exports.compareOfferTime =  function(data, fn){
console.log('waterfall2');
  console.log(data.dist);
  console.log(data.offer2.radius);
  if (data.dist<data.offer2.radius) {

    console.log("it's too close");

    var startDate1 = moment(new Date(data.offer1.showDate));
    startDate1.subtract('days', data.offer1.daysPrior);

    var endDate1 = moment(new Date(data.offer1.showDate));
    endDate1.add('days', data.offer1.daysAfter);


    var start = startDate1;
    var end = endDate1;

    var range = moment(start).twix(end);


    var startDate2 = moment(new Date(data.offer2.showDate));
    startDate2.subtract('days', data.offer2.daysPrior);

    var endDate2 = moment(new Date(data.offer2.showDate));
    endDate2.add('days', data.offer2.daysAfter);

    var start2 = startDate2;
    var end2 = endDate2;
    var range2 = moment(start2).twix(end2);

    var overlap = range.overlaps(range2);

    data.overlap = overlap;


    debugger;
    fn(null, data);
  } else {

    fn(null, data);
  }
}

exports.assessConflicts = function(data, fn){
  console.log('waterfall3');
  console.log(data.overlap);
  if (data.overlap) {
    if (!data.offer2.isConfirmed) {
      data.offer1.conflicts.push(data.offer2.id);
      console.log(data.offer1.conflicts);
      fn(null, data);
    } else{
      data.confirmedConflict = true;
      fn(null, data);
    }
  } else {
    fn(null, data);
  }
}

exports.assessSave = function(data, fn ){
  console.log('waterfall 4');
  data.count.count ++;

if (data.count.count === data.offerLength) {
  data.count.count = 0;
  if (data.confirmedConflict) {
    res.render('offer/rejected');
    fn(null, data);
  }
  else if (data.offer1.conflicts.length) {
    console.log('THIS OFFER HAS CONFLICTS');
    for (var i = 0; i < data.offer1.conflicts.length; i++) {
      Offer.findById(data.offer1.conflicts[i], function(err, offer){
        offer.conflicts.push(data.offer1.id);
        offer.save(function(err, offer){
          console.log(offer);
        });
      });
      data.offer1.save(function(err, offer){
        console.log('SAVE STATE 1 IS FIRING');
        console.log(offer);
        data.buyer.offers.push(offer);
        data.buyer.save(function(err, buyer){
          fn(null, data);
        });
      });
    }
  }
  else {
    console.log('THIS OFFER HAS NO CONFLICTS');
    data.offer1.save(function(err, offer){
      console.log('SAVE STATE 2 IS FIRING');
      console.log(offer);
      data.buyer.offers.push(offer);
      data.buyer.save(function(err, buyer){
        fn(null, data);
      });
    });
    }
  }
}