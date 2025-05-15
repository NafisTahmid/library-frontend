import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, Button, Card, ListGroup, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails, createReview } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_REVIEW_RESET } from '../constants/productConstants';


function ProductScreen( ) {
  const [qty, setQty ] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const productReviewCreate = useSelector(state => state.productCreateReview);
  const {loading:reviewLoading, error:reviewError, success:reviewSuccess} = productReviewCreate;
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if(reviewSuccess) {
      setRating(0);
      setComment('');
      dispatch({type: PRODUCT_REVIEW_RESET })
    }
    dispatch(listProductDetails(id));
  }, 
  [dispatch, id, reviewSuccess]
 )

 const productDetails = useSelector(state => state.productDetails);
 const { loading, error, product } = productDetails;
 const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
 }

 const submitHandler = (e) => {
  e.preventDefault();
  dispatch(createReview({
    rating: Number(rating),  // Ensure rating is a number
    comment
  }, id));
};

  return (
    <div>
        <Link to="/" className="btn btn-light my-3 rounded">Go Back</Link>

        {
          loading ? <Loader/>
          : error ? <Message variant="danger">{error}</Message>
          : (
            <div>
                   <Row>
                      <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid/>
                      </Col>
            
                      <Col md={3}>
                          <ListGroup variant="flush">
                              <ListGroup.Item>
                                  <h3>{product.name}</h3>
                              </ListGroup.Item>
            
                              <ListGroup.Item>
                                  <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                              </ListGroup.Item>
            
                              <ListGroup.Item>
                                Price: ${product.price}
                              </ListGroup.Item>
            
                              <ListGroup.Item>
                                Description: {product.description}
                              </ListGroup.Item>
                          </ListGroup>
                      </Col>
            
                      <Col md={3}>
                        <Card>
                          <ListGroup variant="flush">
                              <ListGroup.Item>
                                <Row>
                                  <Col>
                                    Price:
                                  </Col>
                                  <Col>
                                    <strong>${product.price}</strong>
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <Row>
                                  <Col>
                                    Status:
                                  </Col>
                                  <Col>
                                    {product.countInStock > 0 ? 'In stock' : 'Sold out'}
                                  </Col>
                                </Row>
                              </ListGroup.Item>
                              { product.countInStock > 0 && (
                                <ListGroup.Item>
                                  <Row>
                                    <Col>
                                      Quantity
                                    </Col>
                                    <Col xs="auto" className="my-1">
                                      <Form.Control
                                        as="select"
                                        value={qty}
                                        onChange = {(e) => setQty(e.target.value)}
                                      >
                                        {
                                          [...Array(product.countInStock).keys()].map(x => (
                                            <option key={x + 1} value={ x + 1}>{x + 1}</option>
                                          ))
                                        }

                                      </Form.Control>
                                    </Col>
                                  </Row>
                                </ListGroup.Item>
                              )}
                              <ListGroup.Item>
                                <Button onClick={addToCartHandler} className="btn-block mx-auto d-block" disabled={ product.countInStock === 0 } type="button">Add to Cart</Button>
                              </ListGroup.Item>
                          </ListGroup>
                        </Card>
                      </Col>
                    </Row>
                    <hr/>
                    <Row>
                      <Col md={6} xs={12}>
                            <h4>Reviews</h4>
                            {reviewLoading && <Loader/>}
                            {reviewSuccess && <Message variant="success">Review submitted successfully :D</Message>}
                            {reviewError && <Message variant="danger">{reviewError}</Message>}
                            {  product.reviews.length === 0 && <Message variant="info">No reviews</Message>}
                            <ListGroup variant="flush">
                              {
                                   product.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} color="#f8e825"/>
                                        <p>{review.comment}</p>
                                        <small>{review.createdAt.substring(0,10)}</small>
                                    </ListGroup.Item>
                                  ))
                              }
                              <ListGroup.Item>
                                  {
                                    userInfo ? (
                                      <Form onSubmit={submitHandler}>
                                          <Form.Group controlId="rating">
                                              <Form.Label>Rating</Form.Label>
                                              <Form.Control
                                                as="select"
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                              >
                                                <option value="">Select...</option>
                                                <option value="1">1 - Very Bad</option>
                                                <option value="2">2 - Bad</option>
                                                <option value="3">3 - Good</option>
                                                <option value="4">4 - Very Good</option>
                                                <option value="5">5 - Excellent</option>
                                              </Form.Control>
                                          </Form.Group>
                                          <Form.Group controlId="comment">
                                              <Form.Label>Comment</Form.Label>
                                              <Form.Control
                                                as="textarea"
                                                placeholder="Please enter your review"
                                                row="5"
                                                value={comment}
                                                onChange = {(e) => setComment(e.target.value)}
                                              >

                                              </Form.Control>

                                          </Form.Group>
                                          <Button type="submit" variant="primary" className="mt-2" disabled={reviewLoading}>Add Review</Button>
                                      </Form>
                                    ) :
                                    <Message variant="info">Please <Link to="/login">Log in</Link> to write a review</Message>
                                  }
                              </ListGroup.Item>
                            </ListGroup>
                      </Col>
                      <Col md={6} xs={12}>
                      </Col>
                    </Row>

            </div>
       
          
          )
        }

      
    </div>
  )
}

export default ProductScreen