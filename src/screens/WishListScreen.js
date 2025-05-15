import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { Link, useNavigate } from 'react-router-dom';
import { WISHLIST_CREATE_RESET } from '../constants/wishlistConstants';
import { createWishList } from '../actions/wishListAction';

function WishListScreen() {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [details, setDetails] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishListCreate = useSelector(state => state.wishListCreate);
  const { loading, success, error } = wishListCreate;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    
    if (success) {
      dispatch({ type: WISHLIST_CREATE_RESET });
      navigate('/');
    }
  }, [dispatch, success, navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    dispatch(createWishList({
      name,
      genre,
      details
    }));
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <h1>Request a book</h1>
      
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      
      <FormContainer>
        <Form onSubmit={submitHandler}>
          <Row>
            <Col>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Book Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please enter book name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              
              <Form.Group controlId="genre" className="mb-3">
                <Form.Label>Book Genre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please enter genre name"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  required
                />
              </Form.Group>
              
              <Form.Group controlId="details" className="mb-3">
                <Form.Label>Book Details</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Please enter book details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  rows={4}
                />
              </Form.Group>
              
              <Button 
                variant="primary" 
                type="submit" 
                className="my-3"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Post request'}
              </Button>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </div>
  );
}

export default WishListScreen;