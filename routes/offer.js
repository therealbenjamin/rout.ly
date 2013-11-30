var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var Buyer = mongoose.model('Buyer');
var m = require('../lib/mechanics');
var async = require('async');
var forEach = require('async-foreach').forEach;
var datacount = {count: 0};

exports.index = function(req, res){
  Buyer.findById(req.session.userId).populate('venues').exec(function(err, buyer){
    res.render('offer/index', {title: 'Rout.ly', user:buyer, venues: buyer.venues});
  });
};

exports.create = function(req, res){

  Buyer.findById(req.session.userId, function(err, buyer){

    var offer1 = new Offer(req.body);

    Offer.find(function(err, offers){
      if (offers.length) {

        forEach(offers, function(offer, index){
          var done = this.async();
          async.waterfall([
            function(fn){m.compareOfferDistance(offer1, offer, buyer, offers, datacount, fn);},
            function(data, fn){m.compareOfferTime(data, fn);},
            function(data, fn){m.assessConflicts(data, fn);},
            function(data, fn){m.assessSave(data, fn);}
          ], function(err, result){
            // console.log(result);
            // console.log(err);
            // console.log('-------trying the done fn--------');
            done();
          });
        });

      } else {
        offer1.save(function(err, offer){
          console.log('----------------this is save 3--------------');
        });
        buyer.offers.push(offer1);
        buyer.save(function(err, buyer){
        });
      }
    });
    res.redirect('/overview');
  });
};

exports.show = function(req, res){
  Buyer.findById(req.session.userId).populate('offers').exec(function(err, buyer){
    res.render('offer/details', {title: 'Rout.ly', buyer: buyer});
  });
};

exports.retrieve = function(req, res){
  Buyer.findById(req.session.userId).populate('offers').exec(function(err, buyer){
    res.send(buyer);
  });
};

exports.retrieveOne = function(req, res){
  Offer.findById(req.params.id, function(err, offer){
    console.log(offer);
    res.send(offer);
  });
};
