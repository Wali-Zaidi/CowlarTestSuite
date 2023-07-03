import React from 'react';
import axois from 'axios';
import {portCall} from '../Components/config';
import '../CSS/View.css';
import Loader from '../Components/Loader';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function LandingPage() {

    const userData = {
        username: "",
        password: "",
        email: ""
    }

    const [user, setUser] = React.useState(userData);

    const [loading, setLoading] = React.useState(false);

    const handleChange = (event) => { 
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async(event) => {

        event.preventDefault();
        setLoading(true);
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
                showAlert(err.response.data.message);
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
                showAlert(err.response.data.message);
            }
        }
        setLoading(false);
    }
    
    const showAlert = (message) => {
        const alertElement = document.createElement('Container');
        alertElement.classList.add('alert');
        alertElement.textContent = message; 
        document.getElementById('mainDiv').appendChild(alertElement);
        setTimeout(function() {
            alertElement.remove();
        }, 4000);
    }

    return( //mostly a rough draft, styling will come later on => resolved
        <Container id='mainDiv' className='mw-100'>
            <Container id='loginDiv'>
                <Container id='loginForm'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name='username' value={user.username} onChange={handleChange} required/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" name='password' value={user.password} onChange={handleChange} required/>
                        </Form.Group>
                        <Form.Group controlId='formSubmit'>
                            <Button type="submit" value='Login' onClick={handleSubmit}>
                                Login
                            </Button>
                            <Button type="submit" value='Register' onClick={handleSubmit}>
                                Register
                            </Button>
                        </Form.Group>
                        <Form.Group controlId='formLoader'>
                            {loading && <Loader/>}
                        </Form.Group>
                        
                    </Form>
                    {/* <form onSubmit={handleSubmit}>
                        <Container id='usernameDiv'>
                            <label> Username: </label>
                            <input type='text' id='username' name='username' value={user.username} onInput={handleChange} required/>
                        </Container>
                        <Container id='passwordDiv'>
                            <label> Password: </label>
                            <input type='password' id='password' name='password' value={user.password} onChange={handleChange} required/>
                        </Container>
                        <Container id='emailDiv'>
                            <label> Email: </label>
                            <input type='email' id='email' name='email' value={user.email} onChange={handleChange} required/>
                        </Container>
                        <Container id='submitDiv'>
                            <input type='button' id='submit' name='submit' value='Login' onClick={handleSubmit}/>
                            <input type='submit' id='submit' name='submit' value='Register' onClick={handleSubmit}/>
                        </Container>
                        <Container id='loaderDiv'>
                            {loading && <Loader/>}
                        </Container>
                    </form> */}
                </Container>
            </Container>
        </Container>
    )
}

// final version

export default LandingPage; 
