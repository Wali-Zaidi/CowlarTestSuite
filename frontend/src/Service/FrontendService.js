import axios from 'axios';
import { portCall } from '../Components/config';

async function addListItem (toDo, setShowForm, setDay, fetchListItems) {
    try { 
        const response = await axios.post(`${portCall}/todo/list`, toDo);
        setShowForm(false);
        setDay(toDo.createdTime) //this is to make sure that the list is updated when a new item is added
        fetchListItems();
        return(response.data.message);
    }
    catch (err) {
        return(err.response.data.message);
    }
}

async function sendLoginData() {

}

async function sendSignupData() {

}

export { addListItem, sendLoginData, sendSignupData };