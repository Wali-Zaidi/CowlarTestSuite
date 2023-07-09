const mongoose = require('mongoose');


let connectToDatabase = async() => {

    try {
        await mongoose.connect(process.env.DATABASE_ACCESS, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to database");
    }
    catch (err) {
        console.log(err.message);
        console.log("Error connecting to database");
    }
}

module.exports = connectToDatabase;