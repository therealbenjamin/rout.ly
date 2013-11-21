var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var Buyer = mongoose.model('Buyer');
// var User = mongoose.model('User');

exports.index = function(req, res){
  Buyer.findById(req.session.userId, function(err, buyer){
    res.render('offer/index', {title: 'Rout.ly', user:buyer});
  })

};

exports.create = function(req, res){

  Buyer.findById(req.session.userId, function(err, buyer){
    var offer = new Offer(req.body);
    offer.save(function(err,data){
      buyer.offers.push(data.id);
      buyer.save(function(err, buyer){
        res.redirect('/offer/' + data.id);
      });
    });
  });
};

exports.show = function(req, res){
  Buyer.findById(req.session.userId). populate('offers').exec(function(err, buyer){
    res.render('offer/details', {title: 'Rout.ly', buyer: buyer});
  });
};

exports.retrieve = function(req, res){
  Buyer.findById(req.session.userId).populate('offers').exec(function(err, buyers){
    res.send(buyers);
  });
}

exports.retrieveOne = function(req, res){
  Offer.findById(req.params.id, function(err, offer){
    console.log(offer);
    res.send(offer);
  })
}