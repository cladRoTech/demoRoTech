// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();
// Import routes
let carRoutes = require("./routes/carRoutes");
let parkingRoutes = require("./routes/parkingRoutes")
const { program } = require('commander');
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoose.set('useNewUrlParser', true);
mongoose.set('debug',true)

let connections = require("./utility/connections.js");

// if ( process.argv[2] == "globalstg" ) {
//     mongoose.connect(globalstg, { useNewUrlParser: true})
// }
// else if (process.argv[2] == 'o2ukprod'){
// mongoose.connect(o2ukprod, {useNewUrlParser: true})
// }
// else console.log("no Mongo URI passed") 

switch(true){
    case process.argv[2] == "globalstg"
        :mongoose.connect(connections.globalstg, { useNewUrlParser: true} )
        break;
    case process.argv[2] == "o2ukprod"
        : mongoose.connect(connections.o2ukprod, { useNewUrlParser: true} )
        break;
    case process.argv[2] == "local"
        : mongoose.connect(connections.local)
        break;
    case process.argv[2] == "ncsaprod"
        : mongoose.connect(connections.ncsaprod, { useNewUrlParser: true} )
        break;
    case process.argv[2] == null
        :console.log('\x1b[41m', "***No reference to DB is passed - API NOT CONNECTED TO ANY DB***")
        break;
}

var db = mongoose.connection;


// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("\x1b[7m","The API is connected to " + process.argv[2] + "\nwith the following URI\n" + db._connectionString )

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', carRoutes);
app.use('/api', parkingRoutes);
// Launch app to listen to specified port
app.listen(port,function () {
    console.log("LISTENING ON PORT --->", port)
    console.log("\x1b[7m", "APPLICATION STARTED SUCCESSFULLY");
});
