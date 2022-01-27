var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
let allCountry = require('country-state-city').Country;
let allStates = require('country-state-city').State;
let allCities =  require('country-state-city').City;
const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

// console.log(Country.getAllCountries())
app.get('/countries', (req, res) => {
    let countries= allCountry.getAllCountries();
    res.json(countries); 
});
let countryCode;
app.post("/state", (req, res) => {
    console.log(req.body);
    countryCode = req.body.value; 
    let states = allStates.getStatesOfCountry(countryCode);
    console.log(states);
    res.json(states);
});
app.post("/cities", (req, res) => {
    console.log(req.body);
    let stateCode = req.body.value; 
    let cities = allCities.getCitiesOfState(countryCode, stateCode);
    console.log(cities);
    res.json(cities);
});


mongoose.connect('mongodb://localhost:27017/location', {
    useNewUrlParser: true,
    useUnifiedTopology:true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in connecting to database"));
db.once('open', () => console.log("connected to Database"));

app.post("/sign_up", (req, res) => {
    // console.log("check")
    var fname = req.body.fname;
    var lname = req.body.lname;
    var gender = req.body.gender;
    var email = req.body.email;
    var pass = req.body.password;

    var data = {
        "fname": fname,
        "lname": lname,
        "gender": gender,
        "email": email,
        "pass": pass
    }
    
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("inserted");
    });

    return res.redirect('index.html');

})
console.log("check")
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    // console.log("check")
    return res.redirect('index.html');
}).listen(3000);

