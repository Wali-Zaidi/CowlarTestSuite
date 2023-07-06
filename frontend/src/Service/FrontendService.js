import axios from 'axios';
import { portCall } from '../Components/config';


async function addListItem (toDo) {
    try { 
        const response = await axios.post(`${portCall}/todo/list`, toDo);
        var stringMessage = "Item added successfully!";
        console.log(stringMessage);
    }
    catch (err) {
        stringMessage = err.response.data.message;
        console.log(stringMessage);
    }
    console.log(stringMessage);
    return stringMessage;
}

async function sendLoginData() {

}

async function sendSignupData() {

}

async function fetchListItemsService(day) {
    const response = await axios.get(`${portCall}/todo/list`, {params: {
            "username": sessionStorage.getItem('username'),
            "createdTime": day
    }});
    return response;
}

export { addListItem, sendLoginData, sendSignupData, fetchListItemsService };