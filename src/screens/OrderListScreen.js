import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../actions/orderActions';
import { Button, Table } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

function OrderListScreen() {
    const dispatch = useDispatch();

    // Accessing state
    const allOrders = useSelector((state) => state.ordersList);
    const { loading, error, success, orders } = allOrders;
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getOrders());
        } else {
            navigate('/login')
        };
    }, [dispatch, navigate]);

    return (
        <div>
       
        {loading && <Loader/>}
        {error && <Message variant="danger">{error}</Message>}
          {
        loading ? (<Loader/>)
        : error ? (<Message variant="danger">{error}</Message>)
        : (
            <Table striped responsive bordered hover className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>TOTAL PRICE</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {
                        orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>${order.totalPrice}</td>
                              
                                <td>{order.isPaid ? (
                                    order.paidAt.substring(0, 10)
                                ) : (<i className="fas fa-check" style={{color:"red"}}></i>)}
                                </td>
                                
                                <td>{order.isDelivered ? (
                                    order.deliveredAt.substring(0, 10)
                                ) : (<i className="fas fa-check" style={{color:"red"}}></i>)}
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}/`}>
                                        <Button className="btn-sm" variant="light">
                                            DETAILS
                                        </Button>
                                    </LinkContainer>
                                        
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
        )
    }
    </div>
  
    );
}

export default OrderListScreen;
