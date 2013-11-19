/* global document, window, io */

$(document).ready(initialize);

var socket;

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  initializeMap();
  google.maps.event.addDomListener(window, 'load', initialize);
}

function initializeSocketIO(){
  var port = window.location.port ? window.location.port : '80';
  var url = window.location.protocol + '//' + window.location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
}

function initializeMap(){
  var mapOptions = {
    center: new google.maps.LatLng(36.1667, -86.7833),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  console.log(map);
}

function socketConnected(data){
  console.log(data);
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

$(function() {
    $('.date').datepicker();
  });

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //


