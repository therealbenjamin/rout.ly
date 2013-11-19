var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var Buyer = mongoose.model('Buyer');
var User = mongoose.model('User');

exports.index = function(req, res){
  res.render('offer/index', {title: 'Rout.ly'});
};


exports.show = function(req, res){
  res.render('offer/update', {title: 'Rout.ly'});
};

exports.details = function(req, res){
  var offer = new Offer(req.body);
  offer.save(function(err, offer){
    User.find({id:req.body.userId}, function(err, user){
      console.log(user);
      debugger;
      res.redirect('/offerdetails');
      //NEXT OPERATION IS FINDING BUYER BY MATCHING USER EMAIL AND BUYER EMAIL
    });
  });
};