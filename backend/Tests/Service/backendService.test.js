import testSetup from "../TestSetup";

testSetup();

const backendService = require('../Service/backendService');

//first, adding in a list item

describe('testing the service layer' , () => {
    it('should add a list item', async () => {
        const req = {
            body: {
                username: "test",
                title: "test",
                description: "test",
                status: "active",
                completedTime: "test",
                createdTime: "test"
            }
        }
        const result = await backendService.addListItemService(req);
        expect(result).toBeDefined();
    });

    it('should get all list items', async () => { 
        const req = {
            query: {    
                username: "test",
                createdTime: "test"
        }}

        const result = await backendService.getAllListItemService(req);
        expect(result).toBeDefined();
    });

    it('should update a list item', async () => { 
        const req = {
            body: {
                username: "test",
                title: "test",
                createdTime: "test",
                status: "inactive"
            }
        }

        const result = await backendService.updateListItemService(req);
        expect(result).toBeDefined();
    });

    it('should delete a list item', async () => { 
        const req = {
            query: {
                username: "test",
                title: "test"
            }
        }

        const result = await backendService.deleteListItemService(req);
        expect(result).not.toBeDefined();
    });
});