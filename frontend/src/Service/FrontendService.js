import axios from 'axios';
import { portCall } from '../Components/config';

async function sendFormData (toDo, setShowForm, setDay, fetchListItems) {
    try { 
        const response = await axios.post(`${portCall}/todo/list`, toDo);
        showAlert(response.data.message);
        setShowForm(false);
        setDay(toDo.createdTime) //this is to make sure that the list is updated when a new item is added
        fetchListItems();
    }
    catch (err) {
        showAlert(err.response.data.message);
    }
}

async function sendLoginData() {

}

async function sendSignupData() {

}

