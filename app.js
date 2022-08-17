var express = require('express');
var cors = require('cors');
var dotenv = require('dotenv');
var logger = require('morgan');

var indexRoute = require('./routes/index');
dotenv.config();

var app = express();

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const DB = require('./models/index');

DB.sequilize.sync()   // sync({ force: true }) - to drop existing tables and re-sync database
    .then(() => {
        console.log("Database synced");
    })
    .catch((err) => {
        console.log("Failed to sync db due to ", err.message);
    });

app.use('/', indexRoute);

// const moduleURL = new URL(import.meta.url);
// const __dirname = path.dirname(moduleURL.pathname);
// console.log(`pathname ${moduleURL.pathname}`);
// console.log(`dirname ${path.dirname(moduleURL.pathname)}`);

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
});

module.exports = app;