import React,{useState} from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {login} from '../utils/api.js';

const Login = ({type,handleSetId}) => {
    
    const [id, setId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {status,message} = await login(type,id);
        alert(message);
        if(status === 'success'){
            handleSetId(id);
        }
    }

    return (
        <Container className="login">
        <p>Welcome, please enter your 12 digit {type} ID.</p>
        <Form>
            <Form.Group controlId="id">
                <Form.Control type="text" placeholder="Enter ID" value={id} onChange={(e) => setId(e.target.value)}/>
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>
            <br></br>
            <Button variant="secondary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
        </Container>
    )
    }

export default Login