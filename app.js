var express = require('express');
var cors = require('cors');
var dotenv = require('dotenv');
var logger = require('morgan');

const { router } = require('./routes/index');
const DB = require('./models/index');

dotenv.config();

var app = express();

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const Role = DB.role;

DB.sequilize.sync()   // sync({ force: true }) - to drop existing tables and re-sync database
    .then(() => {
        console.log("Database synced");
        // initial();
    })
    .catch((err) => {
        console.log("Failed to sync db due to ", err.message);
    });

app.use('/', router);
require('./routes/index').userSignUp(app);
require('./routes/v1/user')(app);

// const moduleURL = new URL(import.meta.url);
// const __dirname = path.dirname(moduleURL.pathname);
// console.log(`pathname ${moduleURL.pathname}`);
// console.log(`dirname ${path.dirname(moduleURL.pathname)}`);

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
});

// function initial() {
//     Role.create({
//         id: 1,
//         name: "User"
//     });

//     Role.create({
//         id: 2,
//         name: "Seller"
//     });
// }

module.exports = app;