var mongoose = require('mongoose');
var Offer = mongoose.model('Offer');
var User = mongoose.model('User');
var Buyer = mongoose.model('Buyer');
var bcrypt = require('bcrypt');

exports.create = function(req, res){
  res.render('account/create', {title: 'Rout.ly'});
};

exports.overview = function(req, res){
  Offer.find(function(err, offers){
    res.render('account/overview', {title: 'Rout.ly', offers: offers});
  });
};

exports.new = function(req, res){
  var user = new User();
  user.email =req.body.email;
  bcrypt.hash(req.body.password, 10, function(err, hash){
    user.password = hash;
    user.save(function(err, user){
      if(err){
        console.log(user);
        res.send({status:'error'});
      } else {
        console.log(user);
        res.send({status:'ok'});
      }
    });
  });
  user.save(function(err, user){
    var buyer = new Buyer(req.body);
    buyer.save(function(err, buyer){
      console.log(buyer);
      console.log(user);
      res.redirect('/overview');
    });
  });
};

exports.login = function(req, res){
  User.findOne({email: req.body.email}, function(err, user){
    if(user){
      bcrypt.compare(req.body.password, user.password, function(err, result){
        if(result){
          req.session.regenerate(function(err){
            req.session.userId = user.id;
            req.session.save(function(err){
              res.send({status: 'ok', email: user.email});
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