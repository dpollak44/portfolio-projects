import Button from 'react-bootstrap/Button';

const Logout = ({ user, onLogout }) => {
    const handleLogout = async (e) => {
        onLogout();
    }
    return (
        <div>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
}