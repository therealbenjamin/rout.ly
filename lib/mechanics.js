var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var gm = require('googlemaps');
var util = require('util');
var geodist = require('geodist');

exports.compareOfferAddresses = function(offer1, offer2){

  var street1 = offer1.address;
  var city1 = offer1.city;
  var state1 = offer1.state;
  var zip1 = offer1.zip;

  var address1 = street1 + ' ' + city1 + ' ' + state1 + ', ' + zip1;

  var street2 = offer2.address;
  var city2 = offer2.city;
  var state2 = offer2.state;
  var zip2 = offer2.zip;

  var address2 = street2 + ' ' + city2 + ' ' + state2 + ', ' + zip2;
  var offer1address;
  var offer2address;
  gm.geocode(address1, function(err, data){
    offer1address = data;
    console.log(offer1address.results);
gm.geocode(address2, function(err, data){
    offer2address = data;
    console.log(offer2address.results);
  });
  });

}