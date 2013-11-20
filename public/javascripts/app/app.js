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


function clickAuth(){
  console.log('---auth---');
  $('#authentication').toggleClass('hidden');
  // e.preventDefault();
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
  var street = $('#street').text();
  var city = $('#city').text();
  var state = $('#state').text();
  // var zip = $('#zip').text();

  var address = street + ' ' + city + ' ' + state;
  console.log(address);
  codeAddress(address);
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
