var mongoose = require('mongoose');
var Buyer = mongoose.model('Buyer');
var Venue = mongoose.model('Venue');
var gm = require('googlemaps');

exports.add = function(req, res){
  Buyer.findById(req.session.userId, function(err, buyer){
    res.render('venues/create', {title: 'Rout.ly', user:buyer});
  });
};

exports.save = function(req, res){
  Buyer.findById(req.session.userId, function(err, buyer){
    var venue = new Venue(req.body);
    var street = venue.address;
    var city = venue.city;
    var state = venue.state;
    var zip = venue.zip;
    var address = street + ' ' + city + ' ' + state + ', ' + zip;

    gm.geocode(address, function(err, data){
      venue.lat = data.results[0].geometry.location.lat;
      venue.lng = data.results[0].geometry.location.lng;

    });

    venue.save(function(err, data){
      buyer.venues.push(data.id);
      buyer.save(function(err, buyer){
        res.redirect('/overview');
      });
    });
  });
};
