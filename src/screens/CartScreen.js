import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Card, ListGroup, Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function CartScreen() {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const qty = Number(searchParams.get('qty')) || 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  },[id, qty, dispatch]);

  const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
      if (userInfo) {
        navigate('/shipping');
      } else {
        navigate('/login?redirect=/shipping');
      }
      // navigate('/shipping');
  }

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  return (
    <div className='p-5'>
      <Row>
        <Col md={8}>
          {
            cart.cartItems.length === 0 ? (
            <Message variant="info">Your Cart is empty. <Link to="/">Go back</Link></Message>
          ) : (
            <ListGroup variant="flush">
                {
                  cartItems.map(item => (
                    <ListGroup.Item key={item.product}>
                        <Row>
                          <Col md={2}>
                              <Image src={item.image} alt={item.name} fluid rounded />
                          </Col>
                          <Col md={3}>
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </Col>
                          <Col md={2}>
                            ${item.price}
                          </Col>

                          <Col md={3}>

                             <Form.Control
                                as="select"
                                value={item.qty}
                                onChange = {(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                              >
                                {
                                  [...Array(Math.max(0, item.countInStock || 0)).keys()].map(x => (
                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                  ))
                                }
                            
                             </Form.Control>
                          </Col>

                          <Col md={1}>
                                <Button
                                  type="button"
                                  variant="light"
                                  onClick = {() => removeFromCartHandler(item.product)}

                                >
                                  <i className="fas fa-trash"></i>
                                </Button>
                          </Col>
                        </Row>
                    </ListGroup.Item>
                  ))
                }
            </ListGroup>
          )
        }
        </Col>
        <Col md={4}>
            <ListGroup>
                <ListGroup.Item>
                  <h2>Subtotal: ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}) Items</h2>
                  ${cartItems.reduce((acc, item) => acc + Number(item.qty) * Number(item.price), 0).toFixed(2)}
                </ListGroup.Item>

                <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn-block mx-auto d-block"
                      disabled={cartItems.length === 0}
                      onClick = {checkoutHandler}
                    >Proceed to Checkout</Button>
                </ListGroup.Item>
          </ListGroup>               
        </Col>
      </Row>
    </div>
  )
}

export default CartScreen