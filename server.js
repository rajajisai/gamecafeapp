let connectStore = require( "connect-mongo");

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require("express-session");

const MongoDBStore = require("connect-mongodb-session")(session);
const router = require('express').Router();
require('dotenv').config();
const path = require('path');


const MAX_AGE = 1000 * 60 * 60 * 3; // Three hours

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = process.env.MONGODB_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
// );
mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Database connected successfully!');
      })
      .catch((err) => {
        console.log('Error connecting with error code:', err);
      });
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })


let SESS_NAME = 'sid';
let NODE_ENV = process.env.NODE_ENV;
let SESS_SECRET = 'secret!session';
let SESS_LIFETIME = 1000 * 60 * 60 * 2
app.use(session({
  name: SESS_NAME,
  secret: SESS_SECRET,
  saveUninitialized: false,
  resave: false,
  store: MongoDBStore({
    collection: 'session',
    ttl: parseInt(SESS_LIFETIME) / 1000,
    uri:process.env.MONGODB_URI
  }),
  cookie: {
    sameSite: true,
    secure: NODE_ENV === 'production',
    maxAge: parseInt(SESS_LIFETIME)
  }
}));

// const mongoDBstore = new MongoDBStore({
//   uri: uri,
//   collection: "mySessions"
// });





const customerRouter = require('./routes/customer');
app.use('/customer', customerRouter);

const workStationRouter = require('./routes/workstation');
app.use('/workstation', workStationRouter);

const dateRouter = require('./routes/date');
app.use('/date', dateRouter);


const reportRouter = require('./routes/report');
app.use('/report', reportRouter);

const requestRouter = require('./routes/request');
app.use('/request',requestRouter);
// const router = require('express').Router();
app.use(express.static('client/build'));
app.use(function(req, res) {
	res.sendFile(path.join(__dirname, './client/build/index.html'));
});



app.get('/', function (req, res) {
  res.redirect('/signin');
})

app.listen(port,() => {
    console.log('Server is running on port:',port);
});