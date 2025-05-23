import React from 'react'
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <Nav className="justify-content-md-center">
       
       <Nav.Item>
         {
            step1 ? (
                <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                </LinkContainer>
            ) :
            <Nav.Link>Login</Nav.Link>
         }
       </Nav.Item>

       <Nav.Item>
         {
            step2 ? (
                <LinkContainer to="/shipping">
                    <Nav.Link>Shipping</Nav.Link>
                </LinkContainer>
            ) :
            <Nav.Link>Shipping</Nav.Link>
         }
       </Nav.Item>

       <Nav.Item>
         {
            step3 ? (
                <LinkContainer to="/payment">
                    <Nav.Link>Payment</Nav.Link>
                </LinkContainer>
            ) :
            <Nav.Link>Payment</Nav.Link>
         }
       </Nav.Item>

       <Nav.Item>
         {
            step4 ? (
                <LinkContainer to="/placeorder">
                    <Nav.Link>Order items</Nav.Link>
                </LinkContainer>
            ) :
            <Nav.Link>Order items</Nav.Link>
         }
       </Nav.Item>
       

    </Nav>
  )
}

export default CheckoutSteps