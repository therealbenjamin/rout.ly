var mongoose = require('mongoose');

var Artist = mongoose.Schema({
  name          :     String,
  manager       :     String,
  address       :     String,
  city          :     String,
  state         :     String,
  zip           :     Number,
  phone         :     Number,
  email         :     String,
  minOffer      :     Number,
  startDate     :     Date,
  endDate       :     Date,
  offers        :     [{type: mongoose.Schema.Types.ObjectId, ref: 'Offer'}],
  createdAt     :     {type: Date, default: Date.now}
});

mongoose.model('Artist', Artist);