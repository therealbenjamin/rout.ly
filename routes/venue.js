var mongoose = require('mongoose');
var Buyer = mongoose.model('Buyer');
var Venue = mongoose.model('Venue');

exports.add = function(req, res){
  Buyer.findById(req.session.userId, function(err, buyer){
    res.render('venues/create', {title: 'Rout.ly', user:buyer});
  });
};

exports.save = function(req, res){
  Buyer.findById(req.session.userId, function(err, buyer){
    var venue = new Venue(req.body);
    venue.save(function(err, data){
      buyer.venues.push(data.id);
      buyer.save(function(err, buyer){
        res.redirect('/overview');
      });
    });
  });
}
