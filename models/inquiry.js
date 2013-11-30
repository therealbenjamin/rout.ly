var mongoose = require('mongoose');

var Inquiry = mongoose.Schema({
  name              :     String,
  organization      :     String,
  title             :     String,
  address           :     String,
  city              :     String,
  state             :     String,
  zip               :     Number,
  capacity          :     Number,
  officePhone       :     Number,
  cellPhone         :     Number,
  email             :     String,
  artistsOfInterest :     String,
  promoterHistory   :     String,
  approximateBudget :     String,
  additionalInfo    :     String,
  createdAt         :     {type: Date, default: Date.now}
});

mongoose.model('Inquiry', Inquiry);