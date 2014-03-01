var mongoose = require('mongoose');
var Buyer = mongoose.model('Buyer');
var Inquiry = mongoose.model('Inquiry');

exports.index = function(req, res){
  Buyer.findById(req.session.userId, function(err, buyer){

    res.render('inquiry/index', {title: 'Rout.ly', user:buyer});
  });
};

exports.accept = function(req, res){
  var inquiry = new Inquiry(req.body);
  inquiry.save(function(err, inquiry){
    if (inquiry) {
    res.redirect('/')
    } else{
      res.redirect('/');
      };
  });
}