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

mongoose.connect('mongodb://localhost:27017/location', {
    useNewUrlParser: true,
    useUnifiedTopology:true
});

var db = mongoose.connection;

db.on('error', () => console.log("Error in connecting to database"));
db.once('open', () => console.log("connected to Database"));
//_________________________________________________________________________________________________________
//dropdown
//_________________________________________________________________________________________________________
app.get('/countries', (req, res) => {
    let countries= allCountry.getAllCountries();
    res.json(countries); 
});
let countryCode;
app.post("/state", (req, res) => {
    console.log(req.body);
    countryCode = req.body.value; 
    let states = allStates.getStatesOfCountry(countryCode);
    // console.log(states);
    res.json(states);
});
let stateCode;
app.post("/cities", (req, res) => {
    // console.log(req.body);
    stateCode = req.body.value; 
    let cities = allCities.getCitiesOfState(countryCode, stateCode);
    res.json(cities);
});
// _____________________________________________________________________________________
app.get('/countriesMap', (req, res) => {
    let countries= allCountry.getAllCountries();
    res.json(countries); 
});
let countryCode1;
app.post("/stateMap", (req, res) => {
    // console.log(req.body);
    countryCode1 = req.body.value; 
    let states = allStates.getStatesOfCountry(countryCode1);
    // console.log(states);
    res.json(states);
});
let stateCode1;
app.post("/citiesMap", (req, res) => {
    // console.log(req.body);
    stateCode1 = req.body.value; 
    let cities = allCities.getCitiesOfState(countryCode1, stateCode1);
    res.json(cities);
});
//__________________________________________________________________________________________
app.post("/MapLocations",async (req, res) => {
    // console.log(req.body);
    let city = req.body.city;
    // let countries= allCountry.getAllCountries();
    let cities = allCities.getCitiesOfState(countryCode1, stateCode1);
    // console.log(cities);
    let latitude;
    let longitude;
    for (let i = 0; i < cities.length; i++){
        if (cities[i].name == city) {
            latitude = cities[i].latitude;
            longitude = cities[i].longitude;
            break;
        }
    }
    const Schema = mongoose.Schema;
    const User = mongoose.model('users', Schema({
        fname: String,
        lname: String,
        gender: String,
        email: String,
        pass: String,
        country: String,
        state: String,
        city: String
    }));
    let finalData="";
    const studentData = await User.find({});
    for (let i = 0; i < studentData.length; i++){
        if (studentData[i].city == city) {
            finalData += studentData[i].fname + " "+studentData[i].lname;
            if (i != studentData.length - 1) {
                finalData += ",";
            }
        }
    }
    let finalLocationData = {
        "latitude": latitude,
        "longitude": longitude,
        "finalData": finalData
    };
    // console.log(finalLocationData);
    res.json(finalLocationData);
});


// __________________________________________________________________________________________________________
//Database.
//___________________________________________________________________________________________________________


app.post("/sign_up", (req, res) => {
    // console.log("check")
    let fname = req.body.fname;
    let lname = req.body.lname;
    let gender = req.body.gender;
    let email = req.body.email;
    let pass = req.body.password;
    let country = req.body.country;
    let state = req.body.state;
    let city = req.body.city;
    var data = {
        "fname": fname,
        "lname": lname,
        "gender": gender,
        "email": email,
        "pass": pass,
        "country": country,
        "state": state,
        "city": city
    }
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("inserted");
    });
    return res.redirect('index.html');
})


//_______________________________________________________________________
console.log("check")
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    // console.log("check")
    return res.redirect('index.html');
}).listen(3000);

