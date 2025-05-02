import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button} from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin)
  const {error, loading, userInfo} = userLogin;
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get('redirect');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
  }

  useEffect(() => {
    if (userInfo) {
        navigate('/')
    }
  }, [dispatch, userInfo, navigate])

  return (
    <FormContainer>
        <h1 className="py-3">Sign In</h1>
        {loading && <Loader/>}
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Please enter your email address"
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Please enter your password"
                    value={password}
                    onChange = {(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-3">Log In</Button>
        </Form>

        <Row>
            <Col>
                Don't have an account?<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </Col>
        </Row>

    </FormContainer>
  )
}

export default LoginScreen