var express = require('express');
var cors = require('cors');
var dotenv = require('dotenv');
var logger = require('morgan');

var indexRoute = require('./routes/index');
dotenv.config();

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRoute);

// const moduleURL = new URL(import.meta.url);
// const __dirname = path.dirname(moduleURL.pathname);
// console.log(`pathname ${moduleURL.pathname}`);
// console.log(`dirname ${path.dirname(moduleURL.pathname)}`);

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
});

module.exports = app;