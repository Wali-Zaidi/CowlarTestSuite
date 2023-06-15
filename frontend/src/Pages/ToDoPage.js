//remember to change the datatype of the date to date in the database   
//done that, now to remember to keep this in mind
import React, { useEffect } from 'react';
import {useState} from 'react';
import axios from 'axios';
import {portCall, token} from '../Components/config';
import '../CSS/LandingPage.css';


function ToDoPage() {

    const [day, setDay] = useState("");
    //to hold the list of items
    const [listData, setListData] = useState([]);

    //to hold the date for fetching the list items
    
    const handleDateChange = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        let stringDay = event.target.value;
        stringDay = stringDay.toString();
        console.log(stringDay);
        console.log(stringDay +" is the day"); //all of this just to make sure that the data going to the backend is a string
        setDay(stringDay);
    }; //this is to handle the date change

    useEffect(() => {
        if (day) {
            fetchListItems();
        }
    }, [day]);  //first useeffect to handle the date updation

    //to handle the date change
    const fetchListItems = async (event) => {
        let tempList = [];
        try {
            const response = await axios.get(`${portCall}/todo/list`, {params: {
                "username": sessionStorage.getItem('username'),
                "completedTime": day
            }});
            tempList = response.data.items; //this is to get the items array from the response
            console.log(tempList + " is the list");
            setListData(tempList);
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
                <div id='toDoListDiv'>
                    <table id="toDoListTable">
                    {/* <thead>
                        <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Completed Time</th>
                        <th>Created Time</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        {listData.map((item, i) => (
                        <tr key={i}>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.status}</td>
                            <td>{item.completedTime}</td>
                            <td>{item.createdTime}</td>
                        </tr>
                        ))}
                    </tbody>
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