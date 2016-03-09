// modules =================================================
var express             = require('express');
var expressSession      = require('express-session');
var app                 = express();
var mongoose            = require('mongoose');
var methodOverride      = require('method-override');
var http                = require('http');
var bodyParser          = require('body-parser');
var cookieParser        = require('cookie-parser');
var router              = express.Router();

var port                = process.env.PORT || 8383;
var server              = http.createServer(app);
var io                  = require('socket.io').listen(server);
var dburl;
// server port listener
server.listen(port);

//set dburl var
if(process.env.VCAP_SERVICES){
  var vcap_services = JSON.parse(process.env.VCAP_SERVICES)
  dburl = vcap_services.mongolab[0].credentials.uri
} else {
  var db = require('./config/db');
  dburl = db.url
}

// config files
mongoose.connect(dburl, function (err, res) {                               
  if (err) console.log('**ERROR** connecting to: ' + dburl + '. ' + err);
});

// get all data/stuff of the body (POST) parameters
app.use(methodOverride('X-HTTP-Method-Override'));    // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/client'));       // set the static files location /public/img will be /img for usersapp.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json());                           // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));   // for parsing application/x-www-form-urlencoded

// required for passport
app.use(expressSession({ secret: 'secret-session' })); // session secret

// routes ==================================================
require('./server/routes')(app); // pass our application into our routes

// start app ===============================================
console.log("Something spicy happens on port: " + port);       
