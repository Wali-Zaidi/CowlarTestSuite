const mongoose = require('mongoose');
const doItem = require('../Models/doItemModel'); //gonna need the file to test 

describe('Testing the functionality of the doItem model', () => { //basically telling the program what to pay attention to, and what things 
    //we want to do before we go into testing
    beforeAll(async() => {
        await mongoose.connect("mongodb+srv://i202429:meow@cluster0.yrqzygm.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
    }); //you wanna connect to the database, without going through the index.js file, so you can test the model

    afterAll(async() => {
        await mongoose.connection.close();
    }); //close up the chop shop

    test("Test for adding a new item1", async() => {
        const item1 = new doItem( { 
            username: "testuser2",
            title: "testtitle",
            description: "testdescription",
            status: "active",
            completedTime: "2021-04-28:00:00:00",
            createdTime: "2021-05-01:00:00:00"
        });

        const savedItem = await item1.save();

        expect(savedItem._id).toBeDefined();
        expect(savedItem.username).toBe(item1.username);
        expect(savedItem.title).toBe(item1.title);
        expect(savedItem.description).toBe(item1.description);
        expect(savedItem.status).toBe(item1.status);
    }); //kind of an iffy test, because its only checking to see if the savedItem is the same as the one we input

    test("Test for getting all the items", async() => {
        const items = await doItem.find();
        const itemLength = items.length;

        expect(itemLength).toBeGreaterThan(0);
    });//this is also kind of an iffy test, because its only checking to see if the length of the items array is greater than 0

    test("Test for checking if the update feature works", async() => {
        const originalItem = {
            username: "testuser2"
        }

        const updatedItem = {
            username: "user2",
            title: "title1",
            description: "description1",
            status: "inactive",
            completedTime: "2021-04-28:00:00:00",
            createdTime: "2021-05-01:00:00:00"
        }

        const item1 = await doItem.findOneAndUpdate({username: originalItem.username}, {
            username: updatedItem.username,
            title: updatedItem.title,
            description: updatedItem.description,
            status: updatedItem.status,
            completedTime: updatedItem.completedTime,
            createdTime: updatedItem.createdTime
        }, {new: true});

        expect(item1.username).toBe(updatedItem.username);
        expect(item1.title).toBe(updatedItem.title);
        expect(item1.description).toBe(updatedItem.description);
        expect(item1.status).toBe(updatedItem.status);
    }); //better, actually checks to see if the item1 is updated
    /*
        annoying thing about this is the fact that you have to change the datatype to a string literal, instead of the date object, 
        since handling the date object using the frontend might cause the backend to not recognize it, due to format issues

    */

    test("Test for checking if the delete feature works", async() => { //this is the last test, so we can delete the item1 we created in the first test
        const item1 = await doItem.findOneAndDelete({username: "user2"});   

        expect(item1._id).toBeDefined();
        expect(item1.username).toBe("user2");
        expect(item1.title).toBe("title1");
        expect(item1.description).toBe("description1");
        expect(item1.status).toBe("inactive");
    }); //this is the last test, so we can delete the item1 we created in the first test

});