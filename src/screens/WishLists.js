import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getWishListAction, deleteWishAction } from '../actions/wishListAction';

function WishLists() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishListGet = useSelector(state => state.getWishList); // Changed from getWishList
  const { loading, error, wishList } = wishListGet;
  
  const wishListDelete = useSelector(state => state.wishDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = wishListDelete;
  
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const deleteHandler = (id) => {
    if (window.confirm('Do you want to mark wishlist as confirmed?')) {
      dispatch(deleteWishAction(id));
    }
  };

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    } else {
      dispatch(getWishListAction());
    }
  }, [navigate, dispatch, userInfo, successDelete]); // Added successDelete as dependency

  return (
    <div>
      <h1>Wishlist</h1>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>GENRE</th>
                <th>By</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {wishList?.map((wish) => (
                <tr key={wish._id}>
                  <td>{wish._id}</td>
                  <td>{wish.name}</td>
                  <td>{wish.genre}</td>
                  <td>{wish.username}</td>
                  <td>
                    <Button
                      variant="danger"
                      className="btn-sm mx-auto d-block"
                      onClick={() => deleteHandler(wish._id)} // Fixed: now properly passes function
                      disabled={loadingDelete}
                    >
                      {loadingDelete ? 'Processing...' : 'Mark as added'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}

export default WishLists;