const express = require('express');
const request = require('supertest');

const app = express(); //normal initialization of the app
//calling in the controller
const doItemController = require('../Controllers/doItemController');
const router = require('../Routes/doItemRoute'); //calling in the router

app.use('/', router); //using the router

describe("Testing the to do list item routes", () => {

    it('Testing the add list item function via route', async() => {
        const response = await request(app).post('/list').send({
            username: "testuser1",
            title: "testtitle",
            description: "testdescription",
            status: "active",
            completedTime: "2021-04-28",
            createdTime: "2021-05-01"
        });
        
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Successfully added a new list item");
    })

    it('Testing the failure scenario for the to do list add item route', async() => {
        const response = await request(app).post('/list').send({
            username: "testuser1jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
            title: "testtitle",
            description: "testdescription",
            status: "active",
            completedTime: "2021-04-28",
            createdTime: "2021-05-01"
        });
        
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe({"message": "Error adding item"});
    })

    it('Testing getting all list items for a user', async() => {
        const response = await request(app).get('/list').send({
            username: "testuser1"
        });
        
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Items retrieved successfully");
    });

    it('Testing the failure scenario for getting all list items for a user', async() => {
        const response = await request(app).get('/list').send({
            username: "testuse"
        })

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe({"message": "Error retrieving items"});
    });

    it('Testing getting a specific list item for a user', async() => {
        const response = await request(app).get('/list/1').send({
            username: "testuser1"
        });
        
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Item retrieved successfully");
    });

    it('Testing the failure scenario for getting a specific list item for a user', async() => {
        const response = await request(app).get('/list/1').send({
            username: "testuse"
        })

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe({"message": "Error retrieving item"});
    });
});

