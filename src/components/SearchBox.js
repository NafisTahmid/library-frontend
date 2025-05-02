import React, { useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SearchBox() {
  const navigate = useNavigate();
  const [keyword, setkeyword] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
        navigate(`/?keyword=${keyword}&page=1`);
    } else {
        navigate('/');
    }
  };
  return (
    <div>
        <Form onSubmit={submitHandler} inline className="d-flex">
      
                <Form.Control
                        type="text"
                        name="q"
                        value={keyword}
                        placeholder="Search product"
                        onChange = {(e) => setkeyword(e.target.value)}
                         className="mr-sm-2 ml-sm-5"
                >
                
                </Form.Control>
            
            <Button type="submit" variant="outline-success" className="ms-2">Search</Button>
        </Form>
    </div>
  )
}

export default SearchBox