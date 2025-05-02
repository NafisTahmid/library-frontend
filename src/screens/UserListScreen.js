import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Row, Col, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';

function UserListScreen() {
  const dispatch = useDispatch();
  const userList = useSelector(state => state.usersList);
  const userLogin = useSelector(state => state.userLogin);
  const userDelete = useSelector(state => state.userDelete);
  const { success:deleteSuccess } = userDelete;
  const { userInfo } = userLogin;
  const { loading, error, users } = userList;
  const navigate = useNavigate();


  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
        dispatch(listUsers());
    } else {
        navigate('/login');
    }
  },[dispatch, navigate, deleteSuccess])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user')) {
        dispatch(deleteUser(id));
    }
  };

  return (
    <div>
        <h1>Users</h1>
          {
        loading ? (<Loader/>)
        : error ? (<Message variant="danger">{error}</Message>)
        : (
            <Table striped responsive bordered hover className="table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? (
                                    <i className="fas fa-check" style={{color:'green'}}></i>
                                ) : (<i className="fas fa-check" style={{color:"red"}}></i>)}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit/`}>
                                        <Button className="btn-sm" variant="light">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                        <Button className="btn-sm" variant="danger" onClick={() => deleteHandler(user.id)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
        )
    }
    </div>
  
  )
}

export default UserListScreen