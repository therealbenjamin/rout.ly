exports.index = function(req, res){
  res.render('offer/index', {title: 'Rout.ly'});
};

exports.details = function(req, res){
  res.render('offer/update', {title: 'Rout.ly'});
};