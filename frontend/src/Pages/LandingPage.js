import React from 'react';
import axois from 'axios';
import {portCall} from '../Components/config';
import '../CSS/View.css';

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
    }

    const handleSubmit = async(event) => {

        event.preventDefault();
        if (event.target.value == "Login") {
            try {
                const response = await axois.post(`${portCall}/user/login`, user);
                console.log(response.data);   
                showAlert(response.data.message)
                sessionStorage.setItem('username', user.username);
                window.location.href = '/list';
            }
            catch (err) {
                console.log(err);
                showAlert(err.message);
            }
        }
        else if (event.target.value == "Register") {
            try { 
                const response = await axois.post(`${portCall}/user/signup`, user);
                console.log(response.data);
                showAlert(response.data.message)
            }
            catch (err) {
                console.log(err);
                showAlert(err.message);
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

    return( //mostly a rough draft, styling will come later on => resolved
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