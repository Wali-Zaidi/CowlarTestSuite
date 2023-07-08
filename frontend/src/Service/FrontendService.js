import axios from 'axios';
import { portCall } from '../Config/config';

async function addListItem (toDo) {
    try { 
        const response = await axios.post(`${portCall}/todo/list`, toDo);
        var stringMessage = "Item added successfully!";
    }
    catch (err) {
        stringMessage = err.response.data.message;
    }
    return stringMessage;
}

async function sendLoginData(user) {
    let string = "";
    try {
        const response = await axios.post(`${portCall}/user/login`, user);
        if (response.status == 200) {
            string = "Login successful!";
            return string;
        }
        else if (response.status == 400) {
            string = "Password is incorrect!";
            return string;
        }
    }
    catch (err) {
        if (err.message) {
            if (err.message === "Network Error") {
                string = "Error: Could not connect to the server, please try again later!";
                return string;
            }
        }
        else {
            string = err.response.data.message;
            return string;
        }
    }
}

async function sendSignupData(user) {
    const response = await axios.post(`${portCall}/user/signup`, user);
    if (response) {
        return "Signup successful!"
    }
    else {
        return "Error occured while trying to signup!"
    }
}

async function fetchListItemsService(day) {
    const response = await axios.get(`${portCall}/todo/list`, {params: {
            "username": sessionStorage.getItem('username'),
            "createdTime": day
    }});
    return response;
}

async function handleRadioClickService(title, day) {

    const response = await axios.put(`${portCall}/todo/list`, {
        "username": sessionStorage.getItem('username'),
        "title": title,
        "createdTime": day,
        "status": "inactive",
    });
    if (response) {
        var stringMessage = "Item marked as complete!";    
    }
    else {
        stringMessage = "Error marking item as complete!";
    }

    return stringMessage;
}

async function handleRadioClickOtherService(title, day) {
    const response = await axios.put(`${portCall}/todo/list`, {
        "username": sessionStorage.getItem('username'),
        "title": title,
        "createdTime": day,
        "status": "active",
    });
    if (response) {
        var stringMessage = "Item marked as pending!";    
    }
    else {
        stringMessage = "Error marking item as pending!";
    }

    return stringMessage;
}

async function handleDeleteClickService(title) {
    const response = await axios.delete(`${portCall}/todo/list`, { params: {
        "username": sessionStorage.getItem('username'),
        "title": title,
    }}); //this deletion is happening on the backend, now we need to remove this item from the listData array

    if (response) {
        var stringMessage = "Item deleted successfully!";    
    }
    else {
        stringMessage = "Error deleting item!";
    }

    return stringMessage;
}

export { addListItem, sendLoginData, sendSignupData, fetchListItemsService, handleRadioClickService, handleRadioClickOtherService, handleDeleteClickService };