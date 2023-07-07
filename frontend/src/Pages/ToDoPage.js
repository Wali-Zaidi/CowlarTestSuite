//remember to change the datatype of the date to date in the database   
//done that, now to remember to keep this in mind
import React, { useEffect } from 'react';
import {useState} from 'react';
import axios from 'axios';
import {portCall, token} from '../Config/config';
import '../CSS/View.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import AddTaskForm from '../Components/AddTaskForm';
import { addListItem, fetchListItemsService, handleRadioClickService, handleRadioClickOtherService, handleDeleteClickService } from '../Service/FrontendService';
import Modal from 'react-bootstrap/Modal';
import { CloseButton, ToggleButton } from 'react-bootstrap';

function ToDoPage() {

    //------------- STATES -------------

    const [day, setDay] = useState("");
    //to hold the list of items
    const [listData, setListData] = useState([]);
    const [showDeleteButton, setShowDeleteButton] = useState(false); //to hold the state of the delete button
    const [showForm, setShowForm] = useState(false); //to hold the state of the form
    const [showDatePicker, setShowDatePicker] = useState(false); //to hold the state of the date picker
    const [checked, setChecked] = useState(false); //to hold the state of the radio button

    const toDoAdd = {
        username: sessionStorage.getItem('username'),
        title: "",
        description: "",
        status: "active",
        completedTime: "",
        createdTime: day
    }

    const [toDo, setToDo] = useState(toDoAdd);

    useEffect(() => {
        Date.day = new Date().toISOString().slice(0, 10);
        setDay(Date.day);
    }, []);


    //------------- TABLE -------------

    const handleDateChange = (event) => {
        event.preventDefault();
        setShowDatePicker(true);
        let stringDay = event.target.value;
        stringDay = stringDay.toString();
        setDay(stringDay);
    }; //this is to handle the date change

    useEffect(() => {
        if (day) {
            fetchListItems();
        }
    }, [day]);  //first useeffect to handle the date updation

    const handleClose = () => setShowDatePicker(false); //used to handle the closing of the date picker

    //to handle the date change
    const fetchListItems = async () => { //this also fetches our table items when date is selected
        let tempList = [];
        try {
            const response = await fetchListItemsService(day);
            tempList = response.data.items; //this is to get the items array from the response
            for (let i = 0; i < tempList.length; i++) {
                tempList[i].id = i; //this is to add an id to each item in the array, so that we can use it in the table
            }
            setListData(tempList);
        } catch (err) {
          showAlert(err);
        }
    };

    const handleRadioClick = async(event) => {
        event.preventDefault();
        let selectedRow = event.target; //do this in bits, as the DOM doesnt like it if you do it all at once   
        selectedRow = selectedRow.parentNode;
        selectedRow = selectedRow.parentNode;

        const checkbox = selectedRow.querySelector(`#checkButton${selectedRow.rowIndex}`);

        if (checkbox.checked === false) {
            checkbox.checked = !checkbox.checked;
            showAlert(await handleRadioClickService(selectedRow.childNodes[1].textContent, day));
            fetchListItems();
        }
        else {
            checkbox.checked = !checkbox.checked;
            showAlert (await handleRadioClickOtherService(selectedRow.childNodes[1].textContent, day));
            fetchListItems();
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
            showAlert(await handleDeleteClickService(selectedRow.childNodes[1].textContent));
            setListData((prevListData) =>
                prevListData.filter((item, index) => index !== selectedRow.rowIndex)
            );
            setShowDeleteButton(false); 
        }
        catch (err) {
            showAlert(err.response.data.message);
        }
    };

    //------------- FORMS -------------

    const handleAddButtonClick = () => {
        setShowForm(true);
    };

    const onFormSubmit = async(event) => {
        event.preventDefault();
        toDo.createdTime = day;
        console.log(toDo);
        showAlert(await addListItem(toDo));
        await fetchListItems();
        setShowForm(false);
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
        <Container id='holderDiv' className='mw-100'>
            <Container id="mainDiv" className='mw-100'>
                <Container id="containerDiv">
                    <Container id="dateSelectionDiv">
                        <Container id="dateSelectionLabelDiv">
                            <label id="dateSelectionLabel">Tasks For: {day}</label>
                        </Container>
                        {/* going over the documentation, placeholder and other html tags wont work with this, need another solution => fixed */}
                        <Button variant='success' id='dateSelection' name='dateSelection' value={day} onClick={handleDateChange}>Select Date</Button>
                        <Modal show={showDatePicker} onHide={handleClose}>
                            <Modal.Header>
                            <Modal.Title>Select a Date</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <input
                                type="date"
                                className="form-control"
                                value={day}
                                onChange={handleDateChange}
                            />
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            </Modal.Footer>
                        </Modal>
                        {/* <input type='date' id='dateSelection' name='dateSelection' value={day} onChange={handleDateChange}></input> */}
                    </Container>
                    <Container id='toDoListDiv'>
                        <table id="toDoListTable">
                            <tbody> 
                                {listData.map((item, i) => (
                                <tr key={i} id={i}>
                                    <td>
                                        <ToggleButton type="checkbox" className='mb-2' variant='outline-success' id={`checkButton${i}`} name="toggle-check" 
                                        checked={
                                            item.status === 'active' ? false : true
                                        } 
                                        value="1" onClick={handleRadioClick}>√</ToggleButton>
                                    </td>
                                    <td>{item.title}</td>
                                    <td className={`ellipsis ${showDeleteButton ? 'hide' : ''}`} onClick={handleCellClick}>
                                        {/* this here is the code to show the ellipsis and then the delete button */}
                                        {showDeleteButton ? (<button onClick={handleDeleteClick}>Delete</button>) : ('⁝')}
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
                {showForm && AddTaskForm(toDo, setShowForm, handleFormInputChange, handleKeyDown, onFormSubmit)}
            </Container>
        </Container>
    )
}

export default ToDoPage;

//final version of ToDoPage.js