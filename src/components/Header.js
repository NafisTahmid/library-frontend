import React from 'react'
import { Navbar,Container, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';
function Header() {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  }

  return (
    <header>
         <Navbar expand="lg" variant="dark" className="bg-dark" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                  <Navbar.Brand>Beet Shop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="ms-auto my-2 my-lg-0 text-center"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                > 
                    <SearchBox/>
                    <LinkContainer to="/cart">
                      <Nav.Link><i className="fas fa-shopping-cart">Cart</i></Nav.Link>
                    </LinkContainer>

                    { userInfo ? (
                         <NavDropdown title={userInfo.name}>
                            <LinkContainer to='/profile'>
                              <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>
                            { userInfo.isAdmin  && (
                              <div>
                                  <LinkContainer to="/admin/usersList/">
                                    <NavDropdown.Item>Users List</NavDropdown.Item>
                                  </LinkContainer>
                                  <LinkContainer to="/admin/productsList/">
                                    <NavDropdown.Item>Books List</NavDropdown.Item>
                                  </LinkContainer>
                                  <LinkContainer to="/admin/ordersList/">
                                    <NavDropdown.Item>Orders List</NavDropdown.Item>
                                  </LinkContainer>
                              </div>
                             
                           
                            )}
                              <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                         </NavDropdown>
                    )
                    :
                        <LinkContainer to="/login">
                          <Nav.Link><i className="fas fa-user">Login</i></Nav.Link>
                        </LinkContainer>
                   
                  }
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header