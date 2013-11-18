exports.create = function(req, res){
  res.render('account/create', {title: 'Rout.ly'});
};

exports.overview = function(req, res){
  res.render('account/overview', {title: 'Rout.ly'});
};

exports.new = function(req, res){
  res.redirect('/overview');
};