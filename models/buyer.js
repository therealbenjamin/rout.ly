var mongoose = require('mongoose');

var Buyer = mongoose.Schema({
  company       :     String,
  signatory     :     String,
  firstName     :     String,
  lastName      :     String,
  address       :     String,
  city          :     String,
  state         :     String,
  zip           :     Number,
  phone         :     Number,
  email         :     String,
  venues        :     [{type: mongoose.Schema.Types.ObjectId, ref: 'Venue'}],
  createdAt     :     {type: Date, default: Date.now}
});

mongoose.model('Buyer', Buyer);