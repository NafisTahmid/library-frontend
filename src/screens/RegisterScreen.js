import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Form, Row, Col, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function RegisterScreen() {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const {loading, error, userInfo } = userRegister;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const redirect = searchParams.get('redirect');

    const registerHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(register(firstName, email, password));
        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate('/login');
        }
    }, [navigate, userInfo]);

  return (
    <FormContainer>
        <h1>Sign Up</h1>
        {loading && <Loader/>}
        {error && <Message>{error}</Message>}
        <Form onSubmit={registerHandler}>
            <Form.Group controlId="firstName">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                    required
                    type="text"
                    value={firstName}
                    placeholder = "Please enter your username"
                    onChange = {(e) => setFirstName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    required
                    type="email"
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)}
                    placeholder = "Please enter your email address"
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    type="password"
                    value={password}
                    placeholder = "Please enter your password"
                    onChange = {(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId = "passwordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    required
                    type="password"
                    value={confirmPassword}
                    placeholder = "Please confirm your password"
                    onChange = {(e) => setConfirmPassword(e.target.value)}
                >

                </Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-2">Sign Up</Button>
        </Form>
        <Row>
            <Col>
                Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen