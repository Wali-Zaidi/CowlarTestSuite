import axios from 'axios';
import { portCall } from '../Components/config';


async function addListItem (toDo) {
    try { 
        const response = await axios.post(`${portCall}/todo/list`, toDo);
        var stringMessage = "Item added successfully!";
        console.log(stringMessage);
        return(stringMessage);
    }
    catch (err) {
        stringMessage = err.response.data.message;
        console.log(stringMessage);
        return(stringMessage);
    }
}

async function sendLoginData() {

}

async function sendSignupData() {

}

export { addListItem, sendLoginData, sendSignupData };