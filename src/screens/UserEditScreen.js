import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails } from '../actions/userActions';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

function UserEditScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdate = useSelector(state => state.userUpdate);
  const { loading:loadingUpdate, error:errorUpdate, success:successUpdate} = userUpdate;
  const navigate = useNavigate();

  const { id }  = useParams();


  useEffect(() => {
    if (successUpdate) {
        dispatch({ type: USER_UPDATE_RESET });
        navigate('/admin/usersList/');
    } else {
        if (!user.name || user._id !== Number(id)) {
            dispatch(getUserDetails(id));
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }
  },[dispatch, id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({
        '_id':user._id,
        'first_name':name,
        'email':email,
        'isAdmin':isAdmin
    }));
  };
  return (
    <div>
       
        <Link to="/admin/usersList/" className="btn btn-light my-3 rounded">Go back</Link>
      
        <h1>Edit User</h1>
        { loadingUpdate && <Loader/> }
        { errorUpdate && <Message variant="danger">{error}</Message>}
        { loading ? <Loader/>
        : error ? <Message variant="danger">{error}</Message>
        : (
            <FormContainer>
                <Form onSubmit={submitHandler}>
                    <Row>
                        <Col>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder = "Please enter name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder = "Please enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >

                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="isAdmin">
                                <Form.Label>Is Admin User</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    label="IsAdmin"
                                    value={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                >
                                </Form.Check>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="my-3">Update User</Button>
                        </Col>
                    </Row>
                </Form>
            </FormContainer>
        )
        }
      
    </div>
  )
}

export default UserEditScreen