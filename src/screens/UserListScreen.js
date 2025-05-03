import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Row, Col, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser, createUser } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { USER_CREATE_RESET } from '../constants/userConstants';

function UserListScreen() {
  const dispatch = useDispatch();
  const userList = useSelector(state => state.usersList);
  const userLogin = useSelector(state => state.userLogin);
  const userDelete = useSelector(state => state.userDelete);
  const userCreate = useSelector(state => state.userCreate);
  
  const { success: deleteSuccess } = userDelete;
  const { loading: loadingCreate, error: errorCreate, success: createSuccess, user: createdUser } = userCreate;
  const { userInfo } = userLogin;
  const { loading, error, users } = userList;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: USER_CREATE_RESET });
    
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
      return;
    }

    if (createSuccess && createdUser) {
      navigate(`/admin/user/${createdUser._id}/edit`);
    } else {
      dispatch(listUsers());
    }
  }, [dispatch, navigate, userInfo, deleteSuccess, createSuccess, createdUser]);

  const createUserHandler = () => {
    dispatch(createUser());
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      <Row className="align-items-center">
        <Col>
          <h1>Users</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm my-3" onClick={createUserHandler}>
            <i className="fas fa-plus"></i> Create User
          </Button>
        </Col>
      </Row>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped responsive bordered hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button className="btn-sm" variant="light">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button 
                    className="btn-sm" 
                    variant="danger" 
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default UserListScreen;