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
  venue         : {type: mongoose.Schema.Types.ObjectId, ref: 'Venue'},
  isConfirmed   : {type: Boolean, default: false},
  conflicts     : [{type: mongoose.Schema.Types.ObjectId, ref: 'Offer'}],
  createdAt     : {type: Date, default: Date.now}
});

mongoose.model('Offer', Offer);