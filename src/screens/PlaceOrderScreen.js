import React, {useState, useEffect} from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Image, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

function PlaceOrderScreen() {
  const orderCreate = useSelector( state => state.orderCreate );
  const { order, success, error } = orderCreate;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
  cart.shippingPrice = ( cart.itemsPrice > 100 ? 0 : 10).toFixed(2);
  cart.taxPrice = Number((cart.itemsPrice * (0.0082))).toFixed(2);
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

  if(!cart.paymentMethod) {
    navigate('/payment');
  }

  const placeOrderHandler = () => {
      dispatch(createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice
      }));
  }

  useEffect(() => {
      if (success) {
        navigate(`/order/${order._id}`);
        dispatch({
          type: ORDER_CREATE_RESET
        })

      }
  }, [success, navigate])
  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                      <strong>Shipping: </strong>
                      { cart.shippingAddress.address }, { cart.shippingAddress.city }
                      { ' '}
                      { cart.shippingAddress.postalCode }
                      { ' ' }
                      { cart.shippingAddress.country }
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                      <strong>Payment Method: </strong>
                      { cart.paymentMethod }
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h2>Order Items</h2>
                    { cart.cartItems.length === 0 ? <Message variant="danger">No items in your cart</Message>
                    :
                    <ListGroup variant="flush">
                      {
                        cart.cartItems.map((item) => (
                          <ListGroup.Item key={item.product}>
                              <Row>
                                <Col md={1}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={5}>
                                  {item.qty} X {item.price} = ${(item.qty * item.price).toFixed(2)}
                                </Col>
                              </Row>
                          </ListGroup.Item>
                        ))
                      }
                    </ListGroup>  
                  }
                  </ListGroup.Item>

              </ListGroup>

            </Col>

            <Col md={4}>

                  <ListGroup>
                    <ListGroup.Item>
                      <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Items:</Col>
                        <Col>${cart.itemsPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping:</Col>
                        <Col>${cart.shippingPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax:</Col>
                        <Col>${cart.taxPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Total:</Col>
                        <Col>${cart.totalPrice}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      { error && <Message variant="danger">{error}</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={ cart.cartItems.length === 0 }
                        className="btn btn-block mx-auto d-block"
                        onClick = {placeOrderHandler}
                      >PLACE ORDER</Button>
                    </ListGroup.Item>
                  </ListGroup>
            
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen