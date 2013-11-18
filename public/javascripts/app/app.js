/* global document, window, io, getValue */

$(document).ready(initialize);

var socket;

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  $('form#performance-info').on('submit', submitOffer);
  $('form#buyer-details').on('submit', submitBuyerDetails);
}

function initializeSocketIO(){
  var port = window.location.port ? window.location.port : '80';
  var url = window.location.protocol + '//' + window.location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
}

function socketConnected(data){
  console.log(data);
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

function submitOffer(){
  var artist = getValue('input[name="artist"]');
  var showDate = getValue('input[name="showDate"]');
  var guarantee = getValue('input[name="showDate"]');
  var dealStructure = $('#deal_structure').val();
  var bonusDeal = getValue('#bonusDeal');
  var boxOffice = $('#box_office').val();
  var radius = getValue('input[name="radius"]');
  var daysPrior = getValue('input[name="daysPrior"]');
  var daysAfter = getValue('input[name="daysAfter"]');
}

function submitBuyerDetails(){

}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //


