const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
// const userRoute = require('./Routes/userRoute')
// const doItemRoute = require('./Routes/doItemRoute')
const appConnect = require('./Connections/routerConnection')
const connectToDatabase = require('./Connections/dbConnection')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

appConnect(app);

// app.use('/user', userRoute);
// app.use('/todo', doItemRoute);

dotenv.config();

connectToDatabase();

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

module.exports = app;
//mostly keep in mind imports and other stuff

//final version of index.js