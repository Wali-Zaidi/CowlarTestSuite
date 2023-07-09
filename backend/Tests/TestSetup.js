import connectToDatabase from '../Connections/dbConnection';
import appConnect from '../Connections/routerConnection';
const request = require('supertest');

function testSetup() {
    connectToDatabase();
    appConnect();
}

export default testSetup;