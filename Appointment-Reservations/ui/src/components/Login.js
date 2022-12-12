import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = ({ onLogin, userId, setUserId }) => {



    const handleSubmit = async (e) => {
        e.preventDefault();
        onLogin();
        setUserId('');
    }

    
    return (
        <Form onSubmit={handleSubmit}>
            <input value={userId} type="text" name="id" placeholder="User ID" onChange={(e) => setUserId(e.target.value)} />
            <Button>Login</Button>
        </Form>
            
      );
}

export default Login;