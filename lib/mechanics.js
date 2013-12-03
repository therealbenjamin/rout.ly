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
        // ADD CODE TO ACCOUNT FOR FIRST OFFER'S RADIUS
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

    overlap = range1.overlaps(range2);

    if(overlap){
      timeConflicts.push(geoConflict);
      done();
    } else {
      done();
    }
  },function(){
    fn(null,timeConflicts);
  });
}

exports.assessConflicts = function(newOffer, timeConflicts,fn){
  console.log('Assessing Conflicts');
  var confirmConflict = false;
  forEach(timeConflicts,function(timeConflict,index){
    var done = this.async();
    if(timeConflict.isConfirmed){
      confirmConflict = true;
    }
    done();
  },function(){
    fn(null,confirmConflict);
  });
}

exports.assessNewOfferConflicts = function(newOffer, conflicts, fn){
  forEach(conflicts,function(conflict,index){
    var done = this.async();
    newOffer.conflicts.push(conflict.id);
    done();
  },function(){
    fn(null,newOffer);
  });
}

exports.saveConflicts = function(offer,conflicts,fn){
  forEach(conflicts,function(conflict,index){
    var done = this.async();
    conflict.conflicts.push(offer.id);
    conflict.save(function(err){
      done();
    });
  },function(){
    fn(null);
  });
};