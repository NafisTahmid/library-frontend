import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Row, Col, Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingScreen() {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const [address, setAddress] = useState(shippingAddress.address);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [city, setCity] = useState(shippingAddress.city);
  const [country, setCountry] = useState(shippingAddress.country);
  const navigate = useNavigate();
  const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({
            address,
            postalCode,
            city,
            country
        }))
        navigate('/payment');

  }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Please enter your address"
                    value={address ? address : ''}
                    onChange = {(e) => setAddress(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Please enter your postal code"
                    value={postalCode ? postalCode : ''}
                    onChange = {(e) => setPostalCode(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Please enter your city"
                    value={city ? city : ''}
                    onChange = {(e) => setCity(e.target.value)}
                >

                </Form.Control>
            </Form.Group>
            <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Please enter your country"
                    value={country ? country : ''}
                    onChange = {(e) => setCountry(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button
                type="submit"
                variant="primary"
                className="mt-3"
            >Continue</Button>
        </Form>

    </FormContainer>
  )
}

export default ShippingScreen