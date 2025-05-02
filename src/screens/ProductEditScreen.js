import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { listProductDetails } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import { updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import axios from 'axios';

function ProductEditScreen() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const { productId } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const {loading, error, product } = productDetails;

  const productUpdate = useSelector(state => state.productUpdate);
  const {loading:loadingUpdate, error:errorUpdate, success:successUpdate, product:product_update } = productUpdate;
  const navigate = useNavigate();
  const editProductHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({
        _id: productId,
        name,
        price,
        image,
        author,
        genre,
        countInStock,
        description
    }))
  };
  useEffect(() => {
        if(successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET});
            navigate('/admin/productsList/');
        } else {
            if(!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setAuthor(product.brand);
                setGenre(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
    
            };
        };
  }, [dispatch, product, productId, successUpdate, navigate])

  const uploadFileHandler = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('product_id', productId);
    setUploading(true);
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        const { data } = await axios.post('/api/products/upload/', formData, config);
        console.log(data);
        setUploading(false);
        setImage(data);
    }catch(error) {
        setUploading(false);
    };
  };

  return (
    <div className="py-3">
        <Link className="btn btn-light" to="/admin/productsList/" rounded> Go Back</Link>
        <FormContainer>
            <Form onSubmit={editProductHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder = "Enter product name"
                        value={name}
                        onChange = {(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        value={price}
                        placeholder="Enter product price"
                        onChange = {(e) => setPrice(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="Image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={uploadFileHandler}
                      
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="author">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type="text"
                        value={author}
                        placeholder="Enter author name"
                        onChange={(e)=> setAuthor(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="genre">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter genre"
                        value={genre}
                        onChange={(e)=>setGenre(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="countInStock"
                >
                    <Form.Label>Book in stock</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter available product number"
                        value={countInStock}
                        onChange={(e)=>setCountInStock(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter book description"
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Update Book</Button>
            </Form>
        </FormContainer>
    </div>
  )
}

export default ProductEditScreen