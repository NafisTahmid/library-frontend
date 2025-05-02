import React, {useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import {Row, Col, Button, Form, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { listMyOrders } from '../actions/orderActions';

function ProfileScreen() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const userDetails = useSelector(state => state.userDetails);
  const {error, loading, user} = userDetails;
  const userLogin = useSelector(state => state.userLogin);
  const myOrders = useSelector((state) => state.myOrders);
  const { loading: loadingOrders, error: ordersError, orders } = myOrders;
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
        navigate('/login');
    } else {
        if (!user || !user.name || success || userInfo._id !== user._id) {
            dispatch({
                type: USER_UPDATE_PROFILE_RESET
            })
            dispatch(getUserDetails('profile'));
            dispatch(listMyOrders());
        } else {
            setFirstName(user.name);
            setEmail(user.email);
        }
    }
  }, [dispatch, navigate, success, user, userInfo])

  const updateUserHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        setMessage('Passwords do not match');
    } else {
        dispatch(updateUserProfile({
            'id': user._id,
            'first_name': firstName,
            'email': email,
            'password': password
        }))
        setMessage('');
    }
  };
  return (
    <Row>
        <Col md={3}>
            <h1>User Profile</h1>
            { message && <Message variant="danger">{message}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={updateUserHandler}>
                <Form.Group controlId="first_name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Update your name"
                        value={firstName}
                        onChange = {(e) => setFirstName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Update your email address"
                        value={email}
                        onChange = {(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Update your password"
                        value={password}
                        onChange = {(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Update your password"
                        value={confirmPassword}
                        onChange = {(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-3">Update Profile</Button>

            </Form>
        </Col>

        <Col md={9}>
            <h1>Orders</h1>
            { loadingOrders ? (<Loader/>)
            : ordersError ? (<Message variant="danger">{ordersError}</Message>)
            : (
                <Table striped responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => (
                                <tr>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>

                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid? order.paidAt.substring(0,10): (
                                        <i className="fas fa-times" style={{color:'red'}}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer
                                            to={`/order/${order._id}`}
                                        >
                                        <Button variant="primary" className="btn btn-sm">Details</Button>
                                        </LinkContainer>
                                        </td>
                                </tr>
                            ))
                        }
                    </tbody>
                   
                </Table>
            )  
        }
        </Col>
    </Row>
  )
}

export default ProfileScreen