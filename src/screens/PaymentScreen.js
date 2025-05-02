import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

function PaymentScreen() {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!shippingAddress) {
    navigate('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as="legend">Select Payment Method</Form.Label>
                <Col>
                    <Form.Check
                        type="radio"
                        label = "Paypal or Credit Card"
                        id="paypal"
                        name="paymentMethod"
                        checked
                        onChange = {(e) => setPaymentMethod(e.target.value)}
                    >

                    </Form.Check>
                </Col>
            </Form.Group>
            <Button
                type="submit"
                variant="primary"
            >
                Continue
            </Button>

        </Form>
        
    </FormContainer>
  )
}

export default PaymentScreen