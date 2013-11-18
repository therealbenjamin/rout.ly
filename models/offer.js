var mongoose = require('mongoose');

var Offer = mongoose.Schema({
  artist        : String,
  showDate      : String,
  guarantee     : Number,
  dealStructure : String,
  bonusDeal     : Number,
  boxOffice     : String,
  radius        : Number,
  daysPrior     : Number,
  daysAfter     : Number,
  createdAt: {type: Date, default: Date.now}
});

mongoose.model('Offer', Offer);