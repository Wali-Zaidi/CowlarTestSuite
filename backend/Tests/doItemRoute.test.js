const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');

describe('testing the doItem route', () => {

    beforeAll(async () => {
        await mongoose.connect('mongodb+srv://i202429:meow@cluster0.yrqzygm.mongodb.net/?retryWrites=true&w=majority', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        server = app.listen(5500);
      });

    test('Testing the add new item', async () => {
        const response = await request(app).post('/todo/list').send({
            username: "test",
            title: "test",
            description: "test",
            status: "active",
            completedTime: "2023-04-03",
            createdTime: "2023-03-27"
        })
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Item added successfully");
    });

    test('Testing the get all items', async () => {
        const response = await request(app).get('/todo/list').send({
            username: "test",
            completedTime: "2023-04-03",
        })
        expect(response.statusCode).toBe(200);
        expect(response.body.items).not.toBeNull();
        console.log(response.body.items)
        expect(response.body.message).toBe("Items retrieved successfully");
    })

    test('Testing the update item', async () => {
        const response = await request(app).put('/todo/list').send({
            username: "test",
            title: "test",
            status: "inactive" //only allow for the update of status
        })
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Item updated successfully");
        expect(response.body.result).not.toBeNull();
    })

    // test('Testing the delete item', async () => {
    //     const response = await request(app).delete('/todo/list').send({
    //         username: "walizaidi",
    //         title: "hello, I'll need to go to the shops",
    //     })
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body.message).toBe("Item deleted successfully");
    // });
})