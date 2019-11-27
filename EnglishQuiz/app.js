var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

const cors = require('cors');
const rtsIndex = require('./app/routes/routes');

var configDB = require('./config/database');
mongoose.connect(configDB.url);

require('./config/passport')(passport);
const quizzRoutes = require('./app/routes/quizz.routes');
///middle ware api 
// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', rtsIndex);

//
app.set('view engine', 'ejs');
app.use('/public', express.static('public')); ////
//
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');

app.use(session({secret: 'hunghung98'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/quizz', quizzRoutes);
require('./app/routes/routes')(app, passport);

app.listen(port, function(err){
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log('server is running at ' + port);
    }
})