import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavBarbt from '../../elements/NavBar/navbarbt.jsx'

function Login() {
    const isAuthLogin = false;
    let loginUser = (e) => {
        e.preventDefault();
    }
    
  return (
    <>
    <div>
        <NavBarbt isAuth={isAuthLogin}/>
    </div>
    <div style={{paddingLeft: '300px',paddingRight: '300px', marginRight: '800px', marignTop:'200px', paddingTop:'20px'}}>
        <Form onSubmit={loginUser}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="EmailAndUsername" placeholder="Enter email or username" />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
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