// Inject dependencies
const express = require('express');
const bodyParser = require('body-parser');
const client = require('mongodb');
const cors = require('cors');
const app = express();

// Declare Routes
const emailRoute = require('./routes/contact_form');

// Use dependencies(Middleware)
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cross-origin Headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
});

// Declare default port
const port = process.env.PORT || 3000;


// Register routes
app.use('/emails', emailRoute);


// MongoDB database connection
async function main() {
    const uri = "mongodb://127.0.0.1:27017/";

    // const client = new MongoClient(uri);
    const client = require('mongoose');

    try {
        await client.connect(uri, {
            useNewURLParser: true,
            useUnifiedTopology: true,
          })
          .then(() => console.log("Connection successful to mognodb atlas."))
          .catch(err => console.log(err));
        
    } catch(error) {
        console.log(error);
    }
}

main().catch(console.error);

app.listen(port, function() {
    console.log('Server listening on port: ' + port);
});