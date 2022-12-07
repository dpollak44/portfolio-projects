import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import './Home.css';

const Home = () => {
    return (
        <Container className="home">
            <h1>Appointment Booking</h1>
            <p>Choose a user type to get started</p>
            <Button className='user-type-button' variant="outline-secondary" href="/patients">Patient</Button>
            <Button className='user-type-button' variant="outline-secondary" href="/providers">Provider</Button>
        </Container>
    );
}


export default Home