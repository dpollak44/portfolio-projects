import React,{useState} from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {login} from '../utils/api.js';

const Login = ({type,handleSetId}) => {
    
    const [id, setId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await login(type,id);
            if(res.status === 200){
                handleSetId(id);
            }
            else{
                alert('Unable to login. Check your id and try again.');
            }
        }
        catch(err){
            alert(`We're sorry. We are unable to log you in at this time.`);
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