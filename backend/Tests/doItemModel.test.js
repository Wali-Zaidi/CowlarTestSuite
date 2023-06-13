const mongoose = require('mongoose');
const doItem = require('../Models/doItemModel'); //gonna need the file to test 

describe('Testing the functionality of the doItem model', () => { //basically telling the program what to pay attention to, and what things 
    //we want to do before we go into testing
    beforeAll(async() => {
        await mongoose.connect(process.env.DATABASE_ACCESS, {useNewUrlParser: true, useUnifiedTopology: true});
    }); //you wanna connect to the database, without going through the index.js file, so you can test the model

    afterAll(async() => {
        await mongoose.connection.close();
    }); //close up the chop shop

    test("Test for adding a new item", async() => {
        const item = { 
            username: "testuser",
            title: "testtitle",
            description: "testdescription",
            status: "active",
            completedTime: "2021-04-28",
            createdTime: "2021-05-01"
        }

        const savedItem = await item.save();

        expect(savedItem._id).toBeDefined();
        expect(savedItem.username).toBe(item.username);
        expect(savedItem.title).toBe(item.title);
        expect(savedItem.description).toBe(item.description);
        expect(savedItem.status).toBe(item.status);
        expect(savedItem.completedTime).toBe(item.completedTime);
        expect(savedItem.createdTime).toBe(item.createdTime);
    }); //kind of an iffy test, because its only checking to see if the savedItem is the same as the one we input

    test("Test for getting all the items", async() => {
        const items = await doItem.find();
        const itemLength = items.length;

        expect(itemLength).toBeGreaterThan(0);
    });//this is also kind of an iffy test, because its only checking to see if the length of the items array is greater than 0

    test("Test for checking if the update feature works", async() => {
        const originalItem = {
            username: "testuser",
            title: "testtitle",
            description: "testdescription",
            status: "active",
            completedTime: "2021-04-28",
            createdTime: "2021-05-01"
        }

        const updatedItem = {
            username: "user1",
            title: "title1",
            description: "description1",
            status: "inactive",
            completedTime: "2021-04-29",
            createdTime: "2021-05-02"
        }

        const item = await doItem.findOneAndUpdate({username: originalItem.username}, {
            username: updatedItem.username,
            title: updatedItem.title,
            description: updatedItem.description,
            status: updatedItem.status,
            completedTime: updatedItem.completedTime,
            createdTime: updatedItem.createdTime
        });

        expect(item.username).toBe(updatedItem.username);
        expect(item.title).toBe(updatedItem.title);
        expect(item.description).toBe(updatedItem.description);
        expect(item.status).toBe(updatedItem.status);
        expect(item.completedTime).toBe(updatedItem.completedTime);
        expect(item.createdTime).toBe(updatedItem.createdTime);
    }); //better, actually checks to see if the item is updated

    test("Test for checking if the delete feature works", async() => { //this is the last test, so we can delete the item we created in the first test
        const item = await doItem.findOneAndDelete({username: "testuser"});

        expect(item.username).toBe("testuser");
    });
});