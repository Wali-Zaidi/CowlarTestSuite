const mongoose = require('mongoose');
const user = require('../Models/userModel'); //gonna need the file to test

describe('Testing the functionality of the user model', () => {
    beforeAll(async() => {
        await mongoose.connect("mongodb+srv://i202429:meow@cluster0.yrqzygm.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
    });

    afterAll(async() => { 
        await mongoose.connection.close();
    });

    test("Test for adding a new user", async() => {
        const user1 = new user( { 
            username: "testuser2",
            password: "testpassword1",
            email: "testuseremail1"
        });

        const savedUser = await user1.save();

        expect(savedUser.username).toBe(user1.username);
        expect(savedUser.password).toBe(user1.password);
        expect(savedUser.email).toBe(user1.email);
    });

    test("Failure Test for adding a new user", async() => {
        const user1 = new user( { 
            username: "testuser2",
            password: "testpassword1",
            email: "testuseremail1"
        });

        const savedUser = await user1.save();

        expect(savedUser.username).not.toBe("testuser1");
        expect(savedUser.password).not.toBe("testpassword");
        expect(savedUser.email).not.toBe("testuseremail");
    });

    test("Test for editing a user", async() => {
        const originalUser = {
            username: "testuser2"
        }

        const updatedUser = {
            username: "user2",
            password: "password1",
            email: "email1"
        }

        const user1 = await user.findOneAndUpdate({username: originalUser.username}, {
            username: updatedUser.username,
            password: updatedUser.password,
            email: updatedUser.email
        }, {new: true});

        
        expect(user1.username).toBe(updatedUser.username);
        expect(user1.password).toBe(updatedUser.password);
        expect(user1.email).toBe(updatedUser.email);
    });

    test("Test for deleting a user", async() => { 
        const user1 = await user.findOneAndDelete({username: "testuser2"});

        expect(user1).not.toBeNull(); //since this one got find one and delete, it should show up as the record before the deletion
    });
})

//final version of userModel.test.js