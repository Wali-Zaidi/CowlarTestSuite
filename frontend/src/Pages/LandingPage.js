import React from 'react';
import axois from 'axios';
import {portCall, token} from '../Components/config';
import '../CSS/LandingPage.css';

function LandingPage() {

    const userData = {
        username: "",
        password: "",
        email: ""
    }

    const [user, setUser] = React.useState(userData);

    const handleChange = (event) => { 
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
        // console.log(user); for testing purposes
    }

    const handleSubmit = async(event) => {

        event.preventDefault();
        if (event.target.value == "Login") {
            //checking to see if the portcall will work
            // axois.post(`${portCall}/user/login`, user).then((response) => {
            //     console.log(response.data);
            //     sessionStorage.setItem('token', response.data.token);
            //     showAlert(response.data.message)
            // }).catch((err) => {
            //     console.log(err);
            // }) for testing the api calls
            try {
                const response = await axois.post(`${portCall}/user/login`, user);
                console.log(response.data);   
                // sessionStorage.setItem('token', response.data.token);
                // console.log(sessionStorage.getItem('token'));
                token = response.data.token;
                console.log(token);
                showAlert(response.data.message)  
                window.location.href = '/list';
            }
            catch (err) {
                console.log(err);
            }
        }
        else if (event.target.value == "Register") {
            // axois.post(`${portCall}/user/signup`, user).then((response) => {
            //     console.log(response.data);
            //     showAlert(response.data.message)
            // }).catch((err) => {
            //     console.log(err);
            // }) for testing the api calls
        
            try { 
                const response = await axois.post(`${portCall}/user/signup`, user);
                console.log(response.data);
                showAlert(response.data.message)
            }
            catch (err) {
                console.log(err);
                showAlert(err.response.data.message);
            }
        
        }
    }
    
    const showAlert = (message) => {
        const alertElement = document.createElement('div');
        alertElement.classList.add('alert');
        alertElement.textContent = message; 
        document.getElementById('mainDiv').appendChild(alertElement);
        setTimeout(function() {
            alertElement.remove();
        }, 4000);
    }


    return( //mostly a rough draft, styling will come later on 
        <div id='mainDiv'>
            <div id='loginDiv'>
                <div id='loginForm'>
                    <form onSubmit={handleSubmit}>
                        <div id='usernameDiv'>
                            <label> Username: </label>
                            <input type='text' id='username' name='username' value={user.username} onInput={handleChange} required/>
                        </div>
                        <div id='passwordDiv'>
                            <label> Password: </label>
                            <input type='password' id='password' name='password' value={user.password} onChange={handleChange} required/>
                        </div>
                        <div id='emailDiv'>
                            <label> Email: </label>
                            <input type='email' id='email' name='email' value={user.email} onChange={handleChange} required/>
                        </div>
                        <div id='submitDiv'>
                            <input type='button' id='submit' name='submit' value='Login' onClick={handleSubmit}/>
                            <input type='submit' id='submit' name='submit' value='Register' onClick={handleSubmit}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LandingPage; 