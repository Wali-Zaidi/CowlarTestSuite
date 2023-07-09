import React from 'react';
import '../CSS/View.css';
import Loader from '../Components/Loader';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { sendLoginData, sendSignupData } from '../Service/FrontendService';

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
        if (user.username === "" || user.password === "") {
            showAlert("Please enter a username and password!");
            return;
        }
        else {
            setLoading(true);
            if (event.target.value === "Login") {
                // const reply = await sendLoginData(user);
                let string = await sendLoginData(user);
                console.log(string);
                // showAlert(await sendLoginData(user))
                if (string === "Login successful!") {
                    showAlert("Login successful!");
                    sessionStorage.setItem('username', user.username);
                    window.location.href = '/list';
                }
                else if (string === "Password is incorrect!") {
                    showAlert("Login unsuccessful, please check credentials again!");
                }
                else {
                    showAlert("Error: Could not login, please try again later!");
                    setLoading(false);
                }
            }
            else if (event.target.value === "Register") {
                showAlert(await sendSignupData(user));
            }
            setLoading(false);
        }
    }
    
    const showAlert = (message) => {
        const alertElement = document.createElement('Container');
        alertElement.classList.add('alert');
        alertElement.textContent = message; 
        document.getElementById('mainDivLogin').appendChild(alertElement);
        setTimeout(function() {
            alertElement.remove();
        }, 4000);
        return message
    }

    return( //mostly a rough draft, styling will come later on => resolved
        <Container id='mainDivLogin' data-testid="landingPage" className='mw-100 container-fluid'>
            <Container id='loginDiv' className='container-sm mw-30'>
                <Container id='loginForm' className='mw-20 container-sm'>
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
                            <Button type="submit" value='Login' className='btn btn-secondary' onClick={handleSubmit}>
                                Login
                            </Button>
                            <Button type="submit" value='Register' className='btn btn-secondary' onClick={handleSubmit}>
                                Register
                            </Button>
                        </Form.Group>
                        <Form.Group controlId='formLoader'>
                            {loading && <Loader/>}
                        </Form.Group>
                    </Form>
                </Container>
            </Container>
        </Container>
    )
}

// final version

export default LandingPage; 
