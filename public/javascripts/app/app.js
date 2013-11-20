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



  $('#authentication').toggleClass('hidden');

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
  var offers = $('#offers').text();
  offers = offers.split(',');
  console.log(offers);
  for (var i = 0; i < offers.length; i++) {
    var data ={};
    data.offer = offers[i];
    sendAjaxRequest('/retrieveoffers/' + offers[i], {}, 'get', null, null, function(err, data){
      console.log(data);
      console.log(err);
      debugger;
    });
  };




  // codeAddress(address);
}

function codeAddress(address) {
  geocoder.geocode( { 'address': address}, function(results, status) {
      console.log(results[0].geometry.location)
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
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
  console.log(data);
}
