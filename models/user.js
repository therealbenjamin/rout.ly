var mongoose = require('mongoose');

var User = mongoose.Schema({
  email       :    {type: String, required: true, unique: true},
  password    :    {type: String, required: true},
  isAdmin     :    {type: Boolean, default: false},
  createdAt   :    {type: Date, default: Date.now}
});

mongoose.model('User', User);