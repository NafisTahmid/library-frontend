import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useLocation } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

function HomeScreen() {
  const dispatch = useDispatch();
  const location = useLocation();
  const productList = useSelector(state => state.productList);
  const { error, loading, products, page, pages } = productList;
  const params = new URLSearchParams(location.search);
  const keyword = params.get('keyword') || '';
  const pageSearch = params.get('page') || 1;

  useEffect(() => {

    
    dispatch(listProducts(keyword, pageSearch));
  }, [dispatch, location.search]);

  return (
    <div className="py-2">
      { !keyword && <ProductCarousel/>}
      <h1 className="py-3">Latest Books</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate 
            pages={pages} 
            page={Number(page)} 
            keyword={location.search} 
          />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;