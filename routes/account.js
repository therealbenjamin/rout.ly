var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var Buyer = mongoose.model('Buyer');
var bcrypt = require('bcrypt');


exports.create = function(req, res){
  Buyer.findById(req.session.userId, function(err, buyer){
    // console.log(buyer);
    res.render('account/create', {title: 'Rout.ly', user:buyer});
  });
};

exports.overview = function(req, res){
  Buyer.findById(req.session.userId).populate('venues').populate('offers').exec(function(err, buyer){
    if (buyer) {
      res.render('account/overview', {title:'Rout.ly', user:buyer, offers: buyer.offers, venues:buyer.venues});
    } else{
      res.redirect('/signup');
    }
  });
};

exports.new = function(req, res){

  var buyer = new Buyer(req.body);

  bcrypt.hash(req.body.password, 10, function(err, hash){
    buyer.password = hash;
    buyer.save(function(err, user){
      if(err){
        // console.log(buyer);
        res.send({status:'error'});
      } else {
        // console.log(buyer);
        res.send({status:'ok'});
      }
    });
  });
  buyer.save(function(err, user){
    res.redirect('/');
  });
};

exports.login = function(req, res){
  Buyer.findOne({email: req.body.email}, function(err, buyer){
    if(buyer){
      bcrypt.compare(req.body.password, buyer.password, function(err, result){
        if(result){
          req.session.regenerate(function(err){
            req.session.userId = buyer.id;
            req.session.save(function(err){
              res.send({status: 'ok', email: buyer.email});
            });
          });
        } else {
          req.session.destroy(function(err){
            res.send({status: 'error'});
          });
        }
      });
    } else {
      res.send({status: 'error'});
    }
  });
};

exports.logout = function(req, res){
  req.session.destroy(function(err){
    res.send({status: 'ok'});
  });
};

exports.redirect = function(req, res){
  res.render('account/not-a-member');
};