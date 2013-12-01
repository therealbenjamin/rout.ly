var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var gm = require('googlemaps');
var geodist = require('geodist');
var moment = require('moment');
var Venue = mongoose.model('Venue');
var moment = require('moment');
var m = require('moment-range');
var twix = require('twix');
var forEach = require('async-foreach').forEach;



exports.compareOfferDistance = function(newOffer, offers, buyer, fn){
  var geoConflicts = [];
  Venue.findById(newOffer.venue, function(err, newOfferVenue){
    forEach(offers, function(offer, index){
        var done = this.async();
        console.log('venue object ->'+offer.venue);
        var dist = geodist({lat: newOfferVenue.lat, lon: newOfferVenue.lng}, {lat: offer.venue.lat, lon: offer.venue.lng});
        console.log(dist);
        if(dist <= offer.radius){
          geoConflicts.push(offer);
        }
        done();
      }, function(){
        fn(null,geoConflicts);
    });
  });
}

exports.compareOfferTime =  function(newOffer, geoConflicts, fn){
  var timeConflicts = [];
  var startDate1,
    startDate2,
    endDate1,
    endDate2,
    range1,
    range2,
    overlap;

  forEach(geoConflicts,function(geoConflict,index){
    var done = this.async();
    startDate1 = moment(new Date(newOffer.showDate));
    startDate1.subtract('days', newOffer.daysPrior);
    endDate1 = moment(new Date(newOffer.showDate));
    endDate1.add('days', newOffer.daysAfter);

    startDate2 = moment(new Date(geoConflict.showDate));
    startDate2.subtract('days', geoConflict.daysPrior);
    endDate2 = moment(new Date(geoConflict.showDate));
    endDate2.add('days', geoConflict.daysAfter);

    range1 = moment(startDate1).twix(endDate1);
    range2 = moment(startDate2).twix(endDate2);

    overlap = range.overlaps(range2);

    if(overlap){
      timeConflicts.push(geoConflict);
      done();
    } else {
      done();
    }

  },function(){
    //ALLDONE
    fn(null,timeConflicts);
  });
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
  console.log('ASSESS SAVE STARTED');

  data.count.count ++;
  var results = {};
if (data.count.count === data.offerLength) {
  data.count.count = 0;
  if (data.confirmedConflict) {
    results = {status: 'THIS OFFER CANNOT BE CONFIRMED'};
    fn(null,results);
  }
  else if (data.offer1.conflicts.length) {
    // console.log('THIS OFFER HAS CONFLICTS');
    for (var i = 0; i < data.offer1.conflicts.length; i++) {
      Offer.findById(data.offer1.conflicts[i], function(err, offer){
        offer.conflicts.push(data.offer1.id);
        offer.save(function(err, offer){
          console.log('---OFFER CONFLICTS SAVED');
        });
      });
      data.offer1.save(function(err, offer){
        // console.log('SAVE STATE 1 IS FIRING');
        data.buyer.offers.push(offer);
        data.buyer.save(function(err, buyer){
          results = {status:'THIS OFFER HAS CONFLICTS'};
          fn(null,results);
        });
      });
    }
  }
  else {
    data.offer1.save(function(err, offer){
      // console.log('SAVE STATE 2 IS FIRING');
      console.log(offer);
      data.buyer.offers.push(offer);
      data.buyer.save(function(err, buyer){
        results = {status:'THIS OFFER HAS NO CONFLICTS'};
        fn(null,results);
      });
    });
    }
  }
  else {
    results = {status:'WE GOT TO THE FINAL ELSE'};
    fn(null, results);
  }
}