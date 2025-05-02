import React, {useState, useEffect} from 'react';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Image, ListGroup } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getOrderDetails, deliverOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';



function OrderScreen() {
    const { orderId } = useParams();
    const orderDetails = useSelector( state => state.orderDetails );
    const { order, error, loading } = orderDetails;
    const orderDeliver = useSelector(state => state.orderDeliver);
    const {error:orderDeliverError, loading:orderDeliverLoading, success:orderDeliverSuccess} = orderDeliver;
    const userLoginInfo = useSelector(state => state.userLogin);
    const { userInfo } = userLoginInfo;
    const navigate = useNavigate();
  
    const dispatch = useDispatch();
  
    if(!error && !loading && order) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    }
  
    useEffect(() => {
        if(!order || order._id !== Number(orderId) || orderDeliverSuccess) {
            dispatch({type: ORDER_DELIVER_RESET});
            dispatch(getOrderDetails(orderId));
        }
    }, [order, orderId, dispatch, orderDeliverSuccess]);

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    };
  
    if (loading) {
      return <Loader />;
    }
  
    if (error) {
      return <Message variant="danger">{error}</Message>;
    }
  
    if (!order || !order.shippingAddress) {
      return <Message variant="danger">Order not found</Message>;
    }
  
    return loading ? (<Loader/>) :
    error ? (<Message>{error}</Message>) :
    (
        <div className="py-5">
            <h1>Order: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping: </strong>
                                { order.shippingAddress.address }, { order.shippingAddress.city }
                                { ' '}
                                { order.shippingAddress.postalCode }
                                { ' ' }
                                { order.shippingAddress.country }
                                { order.isDelivered ? (
                                <Message variant="success">Order delivered at {order.deliveredAt}</Message>
                            ) : (
                                <Message variant="warning">Order not delivered</Message>
                            )
                            }
                            </p>
                            <p><strong>Name:</strong> {order.user.name}</p>
                            <p><strong>Email:</strong><a href={`mailto:${order.user.email}`} target="_blank" rel="noreferrer">{order.user.email}</a></p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                            <strong>Payment Method: </strong>
                            { order.paymentMethod }
                            { order.isPaid ? (
                                <Message variant="success">Order paid at {order.paidAt}</Message>
                            ) : (
                                <Message variant="warning">Order not paid</Message>
                            )
                            }
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            { order.orderItems.length === 0 ? <Message variant="danger">No items in your cart</Message>
                            :
                            <ListGroup variant="flush">
                            {
                                order.orderItems.map((item) => (
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
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                            { error && <Message variant="danger">{error}</Message>}
                            </ListGroup.Item>
                            {orderDeliverLoading && <Loader/>}
                            {userInfo && userInfo.isAdmin  && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button
                                        type="button"
                                        className="btn-g btn-block mx-auto d-block"
                                        onClick={deliverHandler}
                                    >
                                        Mark As Delivered
                                    </Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    
                    </Col>
                </Row>
            </div>
    )

        
     
    
  }

export default OrderScreen