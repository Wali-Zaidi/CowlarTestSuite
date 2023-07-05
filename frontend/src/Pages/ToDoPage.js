//remember to change the datatype of the date to date in the database   
//done that, now to remember to keep this in mind
import React, { useEffect } from 'react';
import {useState} from 'react';
import axios from 'axios';
import {portCall, token} from '../Components/config';
import '../CSS/View.css';
import Loader from '../Components/Loader';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import AddTaskForm from '../Components/AddTaskForm';


function ToDoPage() {

    //------------- STATES -------------

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
    
    //------------- TABLE -------------

    const handleDateChange = (event) => {
        event.preventDefault();
        let stringDay = event.target.value;
        stringDay = stringDay.toString();
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
            for (let i = 0; i < tempList.length; i++) {
                tempList[i].id = i; //this is to add an id to each item in the array, so that we can use it in the table
            }
            setListData(tempList);
        } catch (err) {
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
            showAlert(response.data.message);
        }
        catch (err) {
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
            showAlert(err.response.data.message);
        }
    };

    //------------- FORMS -------------

    const handleAddButtonClick = () => {
        setShowForm(true);
    };
    
    //------------- ALERTS -------------

    const showAlert = (message) => {
        const alertElement = document.createElement('Container');
        alertElement.classList.add('alert');
        alertElement.textContent = message; 
        document.getElementById('mainDiv').appendChild(alertElement);
        setTimeout(function() {
            alertElement.remove();
        }, 4000);
    }

    return (
        <Container id="mainDiv" className='mw-100'>
            <Container id="containerDiv">
                <Container id="dateSelectionDiv">
                    <Container id="dateSelectionLabelDiv">
                        <label id="dateSelectionLabel">Tasks For: {day}</label>
                    </Container>
                    {/* going over the documentation, placeholder and other html tags wont work with this, need another solution => fixed */}
                    <input type='date' id='dateSelection' name='dateSelection' value={day} onChange={handleDateChange}></input>
                </Container>
                <Container id='toDoListDiv'>
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
                </Container>
                <Container id="buttonDiv">
                    <button id="addButton" onClick={handleAddButtonClick}>Add New Task</button>
                    {
                        showDeleteButton && (
                            <button id="deleteButton" onClick={() => setShowDeleteButton(false)} >Cancel Deletion</button>
                        )
                    }
                </Container>
            </Container>
            {showForm && <AddTaskForm/>}
        </Container>
    )
}

export default ToDoPage;

//final version of ToDoPage.js