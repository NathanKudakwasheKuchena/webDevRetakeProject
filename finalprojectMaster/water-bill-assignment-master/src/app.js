require('dotenv').config({ path: './env/.env' });
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const hbs = require("hbs");
const consolidate = require("consolidate");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const authRouter= require('./routes/auth.route')
const billRouter= require('./routes/bill.route')
const messageRouter= require('./routes/message.route')
require("./models/user.model");

const app = express();

const port = process.env.PORT || 3003;

const dbUrl = process.env.NODE_ENV == 'production' ? process.env.MONGO_URI : process.env.MONGO_URI_TEST;
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true }).then(_=>{
  console.log('DB connected');
}).catch(err=>{
  console.log(err);
});
 
app.use(cookieParser());

app.use(bodyParser.json());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * ROUTES START
 *  
*/
// require("./routes/auth.route")(app);
require("./routes/protected.route")(app);
app.use('/api', authRouter)
app.use('/api', billRouter)
app.use('/api', messageRouter)


/* 
 * 
 * ROUTES END
 */

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.engine("ejs", consolidate.ejs);
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

app.listen(port, () => {
  console.log("listening on " + port);
});
