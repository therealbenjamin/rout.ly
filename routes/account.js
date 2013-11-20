var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var User = mongoose.model('User');
var Buyer = mongoose.model('Buyer');
var bcrypt = require('bcrypt');

exports.create = function(req, res){
  res.render('account/create', {title: 'Rout.ly'});
};

exports.overview = function(req, res){
  Buyer.findById(req.session.userId, function(err, buyer){
    res.render('account/overview', {title: 'Rout.ly', offers: buyer.offers});
  });
};

exports.new = function(req, res){
  var buyer = new Buyer();
  buyer.email = req.body.email;
  bcrypt.hash(req.body.password, 10, function(err, hash){
    buyer.password = hash;
    buyer.save(function(err, user){
      if(err){
        console.log(buyer);
        res.send({status:'error'});
      } else {
        console.log(buyer);
        res.send({status:'ok'});
      }
    });
  });
  buyer.save(function(err, user){
    res.redirect('/overview');
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