var mongoose = require('mongoose');

var Offer = mongoose.Schema({
  artist        : String,
  showDate      : Date,
  guarantee     : Number,
  dealStructure : String,
  bonusDeal     : Number,
  boxOffice     : String,
  radius        : Number,
  daysPrior     : Number,
  daysAfter     : Number,
  isConfirmed : {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Offer', Offer);