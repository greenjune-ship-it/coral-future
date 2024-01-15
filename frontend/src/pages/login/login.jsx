import Button from 'react-bootstrap/Button';
import React, {useContext, useState} from 'react'
import AuthContext from '../../context/AuthProvider.js';
import Form from 'react-bootstrap/Form';
import NavBarbt from '../../elements/NavBar/navbarbt.jsx'
import axios from 'axios'
import Cookies from 'js-cookie';
const Login = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    console.log('Trying to connect to djangobackend')
    e.preventDefault();
    const user = {
      username: username,
      password: password
    };
    // send the user object to the backend
    const response = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    console.log(JSON.stringify(user));
    // get the JSON web token from the response
    const data = await response.json();
    const token = data.access;
    // store the token in local storage
    localStorage.setItem('token', token);
    console.log(token)
    // redirect to the home page
    console.log('End of Submition');

    /* window.location.href = "https://www.google.com"; */
  }


  return (
    <>
    <div>
        <NavBarbt />
    </div>
    <div style={{paddingLeft: '10%',paddingRight: '10%', marginRight: '10%', marignTop:'10%', paddingTop:'5%'}}>
        <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="text" name="username"  onChange={e => setUsername(e.target.value)} placeholder="Enter email or username" />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" onChange={e => setPassword(e.target.value)}  placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
    </div>
    </>
  );
} 


export default Login;