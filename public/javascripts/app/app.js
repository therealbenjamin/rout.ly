/* global document, window, io, sendAjaxRequest */

$(document).ready(initialize);

var socket;
var geocoder;
var map;

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  google.maps.event.addDomListener(window, 'load', initializeMap);
  $(function(){$('.date').datepicker();});
  $(function(){$('#accordion').accordion();});
  $('#authentication-button').on('click', clickAuth);
  $('form#authentication').on('submit', clickLogin);
  getOfferStatus();
}


function clickLogin(e){
  var url = '/login';
  var data = $('form#authentication').serialize();
  sendAjaxRequest(url, data, 'post', 'put', e, function(data){
    htmlUpdateLoginStatus(data);
  });
}


function clickAuth(e){

  var isAnonymous = $('#authentication-button[data-email="anonymous"]').length === 1;

  if (isAnonymous) {
    $('#authentication').toggleClass('hidden');
  } else{
    var url = '/logout';
    sendAjaxRequest(url, {}, 'post', 'delete', null, function(data){
      htmlLogout(data);
    });
  }
  e.preventDefault();
}

function initializeSocketIO(){
  var port = window.location.port ? window.location.port : '80';
  var url = window.location.protocol + '//' + window.location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
}

function initializeMap(){
  if($('#map-canvas').length){
    var mapOptions = {
      center: new google.maps.LatLng(36.1667, -86.7833),
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    console.log(map);
    geocoder = new google.maps.Geocoder();
    htmlDrawMapMarkers();
  }
}

function htmlDrawMapMarkers(){

  sendAjaxRequest('/retrieveoffers', {}, 'get', null, null, function(data, status){
    console.log(data);
  //   for (var i = 0; i < data.offers.length; i++) {
  //     var street = data.offers[i].address;
  //     var city = data.offers[i].city;
  //     var state = data.offers[i].state;
  //     var zip = data.offers[i].zip;

  //     var address = street + ' ' + city + ' ' + state + ', ' + zip;
  //     codeAddress(address, data.offers[i]);
  //   }
  });
}

function codeAddress(address, offer) {

  geocoder.geocode( { 'address': address}, function(results, status) {
      var circleOptions ={
        strokeColor: '#FF000',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: 'red',
        fillOpacity: 0.65,
        map: map,
        center: results[0].geometry.location,
        radius: (offer.radius * 1609.34)
      };
      var circle = new google.maps.Circle(circleOptions);
      console.log(circle);
    });
}

function socketConnected(data){
  console.log(data);
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

function clickLogin(e){
  var url = '/login';
  var data = $('form#authentication').serialize();
  sendAjaxRequest(url, data, 'post', 'put', e, function(data){
    htmlUpdateLoginStatus(data);
  });
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

function htmlUpdateLoginStatus(data){
  window.location.href = '/overview';
}

function htmlLogout(data){
  $('#authentication-button').attr('data-email', 'anonymous');
  $('#authentication-button').text('Login');
  $('#authentication-button').removeClass('alert');
  window.location.href = '/';
}

function getOfferStatus(){
  var status = getUrlVars()['status'];
  if(status){
    switch(status){
      case 'offerdenied':
        $('p#offerstatus').text('Your offer was denied due to a conflict with a confirmed show.');
      break;
      case 'newoffer':
        $('p#offerstatus').text('Your offer has been successfully submitted for review');
      break;
    }
  }
}
