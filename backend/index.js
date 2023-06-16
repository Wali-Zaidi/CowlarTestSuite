const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const userRoute = require('./Routes/userRoute')
const doItemRoute = require('./Routes/doItemRoute')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/user', userRoute);
app.use('/todo', doItemRoute);

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Database connection successful")
}).catch((err) => {
    console.log("Error occurred while connecting to the databse", err)
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

module.exports = app;
//mostly keep in mind imports and other stuff

//final version of index.js