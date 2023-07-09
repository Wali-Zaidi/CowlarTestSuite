const userRoute = require('../Routes/userRoute')
const doItemRoute = require('../Routes/doItemRoute')

let appConnect = (express) => {
    express.use('/user', userRoute);
    express.use('/todo', doItemRoute);
}

module.exports = appConnect;