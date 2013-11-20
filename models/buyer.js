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
  password      :    {type: String, required: true},
  isAdmin       :    {type: Boolean, default: false},
  venues        :     [{type: mongoose.Schema.Types.ObjectId, ref: 'Venue'}],
  offers : [{type: mongoose.Schema.Types.ObjectId, ref: 'Offer'}],
  createdAt     :     {type: Date, default: Date.now}
});

mongoose.model('Buyer', Buyer);