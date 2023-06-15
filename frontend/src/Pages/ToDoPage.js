//remember to change the datatype of the date to date in the database   
//done that, now to remember to keep this in mind
import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import {portCall, token} from '../Components/config';
import '../CSS/LandingPage.css';


function ToDoPage() {

    const [day, setDay] = useState(new Date().toISOString().slice(0, 10));
    const toDoListData = {
        username: "",
        title: "",
        description: "",
        status: "",
        completedTime: "",
        createdTime: ""
    }
    //to set the state of the toDoList
    const [toDoList, setToDoList] = useState(toDoListData);

    //to hold the list of items
    const listData = [];

    //to hold the date for fetching the list items
    

    //to handle the date change
    const handleDateChange = async (event) => {
        event.preventDefault();
        console.log(event.target.value);
        setDay(event.target.value);
        console.log(day + " is the day");
        try {
          const response = await axios.get(`${portCall}/todo/list`, {body: {username: "testuser2", completedTime: day}});
          console.log(response.data);
          response.data.items.map((item) => {
            listData.push(item);
            console.log(listData);
          });
        } catch (err) {
          console.log(err);
        }
    };
      


    return (
        <div id="mainDiv">
            <div id="containerDiv">
                <div id="dateSelectionDiv">
                    <div id="dateSelectionLabelDiv">
                        <label id="dateSelectionLabel">Tasks For:</label>
                    </div>
                    {/* going over the documentation, placeholder and other html tags wont work with this, need another solution => fixed */}
                    <input type='date' id='dateSelection' name='dateSelection' value={day} onChange={handleDateChange}></input>
                </div>
                <div id="toDoListDiv">
                    <table id="toDoListTable">
                    </table>
                </div>
                <div id="buttonDiv">
                    <button id="addButton">Add New Task</button>
                </div>
            </div>
        </div>
    )
}

export default ToDoPage;