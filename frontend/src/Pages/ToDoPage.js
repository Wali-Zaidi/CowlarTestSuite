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
    const [opacity, setOpacity] = useState(0.88); //to hold the opacity of the selected row
    const [showDeleteButton, setShowDeleteButton] = useState(false); //to hold the state of the delete button
    const [showForm, setShowForm] = useState(false); //to hold the state of the form

    const toDoAdd = {
        username: sessionStorage.getItem('username'),
        title: "",
        description: "",
        status: "active",
        completedTime: "",
        createdTime: day
    }

    const [toDo, setToDo] = useState(toDoAdd);
    
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
    const fetchListItems = async () => { //this also fetches our table items when date is selected
        let tempList = [];
        try {
            const response = await axios.get(`${portCall}/todo/list`, {params: {
                "username": sessionStorage.getItem('username'),
                "completedTime": day
            }});
            tempList = response.data.items; //this is to get the items array from the response
            console.log(tempList + " is the list");
            for (let i = 0; i < tempList.length; i++) {
                tempList[i].id = i; //this is to add an id to each item in the array, so that we can use it in the table
            }
            setListData(tempList);
        } catch (err) {
          console.log(err); 
          showAlert(err.response.data.message);
        }
    };

    const handleRadioClick = async(event) => {
        event.preventDefault();
        let selectedRow = event.target; //do this in bits, as the DOM doesnt like it if you do it all at once
        selectedRow = selectedRow.parentNode;
        selectedRow = selectedRow.parentNode;
        
        selectedRow.style.opacity = 0.3//this is to change the opacity of the selected row
        selectedRow.disabled = true; //this is to disable the selected row

        try {
            const response = await axios.put(`${portCall}/todo/list`, {
                "username": sessionStorage.getItem('username'),
                "title": selectedRow.childNodes[1].textContent,
                "status": "inactive",
            });
            console.log(response.data);
            showAlert(response.data.message);
        }
        catch (err) {
            console.log(err);
            showAlert(err.response.data.message);
        }
    }

    const handleCellClick = (/*event*/) => { //trying to make sure that the delete button is only displayed where its clicked
        setShowDeleteButton(true);
    };
    
    const handleDeleteClick = async(event) => {
        event.preventDefault();
        let selectedRow = event.target; //do this in bits, as the DOM doesnt like it if you do it all at once
        selectedRow = selectedRow.parentNode;
        selectedRow = selectedRow.parentNode;
        try {
            const response = await axios.delete(`${portCall}/todo/list`, { params: {
                "username": sessionStorage.getItem('username'),
                "title": selectedRow.childNodes[1].textContent,
            }}); //this deletion is happening on the backend, now we need to remove this item from the listData array
            setListData((prevListData) =>
                prevListData.filter((item, index) => index !== selectedRow.rowIndex)
            );
            setShowDeleteButton(false); 
            showAlert(response.data.message);
        }
        catch (err) {
            console.log(err);
            showAlert(err.response.data.message);
        }
    };

    const handleAddButtonClick = () => {
        setShowForm(true);
    };
    
    const onFormSubmit = async(event) => {
        event.preventDefault();
        console.log(toDo);
        toDo.createdTime = day;
        try { 
            const response = await axios.post(`${portCall}/todo/list`, toDo);
            console.log(response.data);
            showAlert(response.data.message);
            setShowForm(false);
            setDay(toDo.createdTime) //this is to make sure that the list is updated when a new item is added
            fetchListItems();
        }
        catch (err) {
            console.log(err);
            showAlert(err.response.data.message);
        }
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          // Call the submit function when Enter key is pressed
          onFormSubmit(event);
        }
    };

    const handleFormInputChange = (event) => {
        setToDo({
            ...toDo,
            [event.target.name]: event.target.value
        })
    }

    //for the alerts

    const showAlert = (message) => {
        const alertElement = document.createElement('div');
        alertElement.classList.add('alert');
        alertElement.textContent = message; 
        document.getElementById('mainDiv').appendChild(alertElement);
        setTimeout(function() {
            alertElement.remove();
        }, 4000);
    }

    return (
        <div id="mainDiv">
            <div id="containerDiv">
                <div id="dateSelectionDiv">
                    <div id="dateSelectionLabelDiv">
                        <label id="dateSelectionLabel">Tasks For: {day}</label>
                    </div>
                    {/* going over the documentation, placeholder and other html tags wont work with this, need another solution => fixed */}
                    <input type='date' id='dateSelection' name='dateSelection' value={day} onChange={handleDateChange}></input>
                </div>
                <div id='toDoListDiv'>
                    <table id="toDoListTable">
                        <tbody> 
                            {listData.map((item, i) => (
                            <tr key={i} id={i} style={{opacity}}>
                                <td>
                                    <input type="checkbox" id="checkbox" name="checkbox" value="checkbox" onClick={handleRadioClick}></input>
                                </td>
                                <td>{item.title}</td>
                                <td className={`ellipsis ${showDeleteButton ? 'hide' : ''}`} onClick={handleCellClick}>
                                    {/* this here is the code to show the ellipsis and then the delete button */}
                                    {showDeleteButton ? (<button onClick={handleDeleteClick}>Delete</button>) : (':::')}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div id="buttonDiv">
                    <button id="addButton" onClick={handleAddButtonClick}>Add New Task</button>
                    {
                        showDeleteButton && (
                            <button id="deleteButton" onClick={() => setShowDeleteButton(false)} >Cancel Deletion</button>
                        )
                    }
                </div>
            </div>
            {showForm && (
                <div id="formDiv">
                    <form id="toDoListFormAdd" className="toDoListForm">
                        <div id="toDoListFormAdd">
                            <div id="toDoListFormAddLabelDiv">
                                <label id="toDoListFormAddLabel">Add New Task:</label>
                            </div>
                            <div id="toDoListFormAddInputDiv">
                                <input type="text" id="toDoListFormAddInput" name="title" placeholder='Title' value={toDo.title} onChange={handleFormInputChange}></input>
                            </div>
                            <div id="toDoListFormAddInputDiv">
                                <input type="date" id="toDoListFormAddInput" name="completedTime" placeholder='Due Date' value={toDo.completedTime} onChange={handleFormInputChange}></input>
                            </div>
                            <div id="toDoListFormAddInputDiv">
                                <input type="text" id="toDoListFormAddInput" name="description" placeholder='Description' value={toDo.description} onKeyDown={handleKeyDown} onChange={handleFormInputChange}></input>
                            </div>
                            <div id="toDoListFormAddInputDiv">
                                <input type="submit" id="toDoListFormAddInput" name="toDoListFormAddInput" value="Add" onClick={onFormSubmit}></input>
                                <input type="button" id="toDoListFormAddInput" name="toDoListFormAddInput" value="Cancel" onClick={() => setShowForm(false)}></input>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default ToDoPage;