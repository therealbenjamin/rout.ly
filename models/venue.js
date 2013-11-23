var mongoose = require('mongoose');

var Venue = mongoose.Schema({
  name            :   String,
  address         :   String,
  city            :   String,
  state           :   String,
  zip             :   Number,
  officePhone     :   Number,
  cellPhone       :   Number,
  email           :   String,
  capacity        :   Number,
  createdAt       :   {type: Date, default: Date.now}
});

mongoose.model('Venue', Venue);