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
      var dist = geodist({lat:venue1.lat, lon:venue1.lng}, {lat:venue1.lat, lon:venue1.lng});
      var data = {};
      data.count = datacount;
      console.log(data.count);
      data.offer1 = offer1;
      data.offer2 = offer2;
      data.venue1 = venue1;
      data.venue2 = venue2;
      data.buyer = buyer;
      data.dist = dist;
      data.offerLength = offers.length;
      // console.log(data);
      fn(null, data);
    });
  });
}

exports.compareOfferTime =  function(data, fn){
console.log('waterfall2');

  if (data.dist<data.offer2.radius) {
    // console.log("it's too close");

    var startDate1 = moment(new Date(data.offer1.showDate));
    startDate1.subtract('days', data.offer1.daysPrior);

    var endDate1 = moment(new Date(data.offer1.showDate));
    endDate1.add('days', data.offer1.daysAfter);

    var start = startDate1;
    var end = endDate1;
    var range = moment.twix(start, end);


    var startDate2 = moment(new Date(data.offer2.showDate));
    startDate2.subtract('days', data.offer2.daysPrior);

    var endDate2 = moment(new Date(data.offer2.showDate));
    endDate2.add('days', data.offer2.daysAfter);

    var start2 = startDate2;
    var end2 = endDate2;
    var range2 = moment().twix(start2, end2);

    var overlap = range.overlaps(range2);
    data.overlap = overlap;
    console.log(data.count);
    // console.log(overlap);
    // console.log(data.overlap);

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
      console.log(data.count);
      fn(null, data);
    } else{
      data.confirmedConflict = true;
      fn(null, data);
    }
  }
}

exports.assessSave = function(data, fn ){
  console.log('waterfall 4');
  data.count.count++;
  console.log(data.count);
  fn();
}