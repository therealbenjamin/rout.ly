var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var Buyer = mongoose.model('Buyer');
var m = require('../lib/mechanics');
var async = require('async');
var forEach = require('async-foreach').forEach;
var datacount = {count: 0};

exports.index = function(req, res){
  Buyer.findById(req.session.userId).populate('venues').exec(function(err, buyer){
    if (buyer) {
      res.render('offer/index', {title: 'Rout.ly', user:buyer, venues: buyer.venues});
    } else{
        res.render('account/not-a-member');
    };
  });
};

exports.create = function(req, res){
  var $conflicts = [];
  Buyer.findById(req.session.userId, function(err, buyer){
    var newOffer = new Offer(req.body);
    Offer.find().populate('venue').exec(function(err,offers){
      if(offers.length){
        async.waterfall([
          function(fn){m.compareOfferDistance(newOffer, offers, buyer, fn);},
          function(geoConflicts,fn){
            if(!geoConflicts.length){
              newOffer.save(function(err,result){
                buyer.offers.push(result.id);
                buyer.save(function(err){
                  res.redirect('/overview?status=newoffer');
                });
              });
            } else {
              m.compareOfferTime(newOffer, geoConflicts, fn);
            }
          },
          function(timeConflicts,fn){
            if(!timeConflicts.length){
              newOffer.save(function(err){
                res.redirect('/overview?status=newoffer');
              });
            } else {
              $conflicts = timeConflicts;
              m.assessConflicts(newOffer, timeConflicts, fn);
            }
          },
          function(confirmConflict,fn){
            if(confirmConflict){
              res.redirect('/overview?status=offerdenied');
            } else {
              m.assessNewOfferConflicts(newOffer,$conflicts,fn);
            }
          },
          function(newOffer,fn){
            newOffer.save(function(err,offer){
              if(offer){
                buyer.offers.push(offer.id);
                buyer.save(function(err, buyer){
                  m.saveConflicts(offer,$conflicts,fn);
                });
              }
            });
          },
          function(fn){res.redirect('/overview?status=newoffer');}
        ]);
      } else {
        newOffer.save(function(err, offer){
          buyer.offers.push(offer.id);
          buyer.save(function(err, buyer){
            res.redirect('/overview?status=newoffer');
          });
        });
      }
    });
  });
};

exports.show = function(req, res){
  Buyer.findById(req.session.userId).populate('offers').exec(function(err, buyer){
    res.render('offer/details', {title: 'Rout.ly', buyer: buyer});
  });
};

exports.retrieve = function(req, res){
  Buyer.findById(req.session.userId).populate('offers').populate('venues').exec(function(err, buyer){
    res.send(buyer);
  });
};

exports.retrieveOne = function(req, res){
  Offer.findById(req.params.id, function(err, offer){
    console.log(offer);
    res.send(offer);
  });
};
