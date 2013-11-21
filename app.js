var express = require('express');
var mongoose = require('mongoose');

// model definitions
require('require-dir')('./models');

// route definitions
var home = require('./routes/home');
var offer = require('./routes/offer');
var account = require('./routes/account');
var inquiry = require('./routes/inquiry');
var venue = require('./routes/venue');

var app = express();
var RedisStore = require('connect-redis')(express);
mongoose.connect('mongodb://localhost/routly');

// configure express
require('./config').initialize(app, RedisStore);

// routes
app.get('/', home.index);
app.get('/createaccount', account.create);
app.get('/newoffer', offer.index);
app.get('/inquiry', inquiry.index);
app.get('/overview', account.overview);
app.post('/overview', account.new);
app.get('/offer/:id', offer.show);
app.post('/offer', offer.create);
app.put('/login', account.login);
app.get('/retrieveoffers', offer.retrieve);
app.get('/retrieveoffers/:id', offer.retrieveOne);
app.delete('/logout', account.logout);
app.get('/addvenue', venue.add);
app.post('/savevenue', venue.save);


// start server & socket.io
var common = require('./sockets/common');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, {log: true, 'log level': 2});
server.listen(app.get('port'));
io.of('/app').on('connection', common.connection);
