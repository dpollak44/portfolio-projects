import {useState} from 'react';
import Login from './Login';
import Logout from './Logout';


const Authentication = () => {
    const [userId, setUserId] = useState(null);

    const login = async () => {
        try {
            const resp = await fetch(`http://localhost/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
            });
    
            if (!resp.ok) {
            return console.error(resp.statusText);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const logout = async () => {
        try {
            const resp = await fetch(`http://localhost/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
            });

            if (!resp.ok) {
            return console.error(resp.statusText);
            }
        } catch (e) {
            console.error(e);
        }
    }
    
    const loginLogout = userId ? <Logout onLogout={logout} userId={userId}/> : <Login onLogin={login} userId={userId} setUserId={setUserId} />;

    return (
        <div>
            {loginLogout}
        </div>
    );
}

export default Authentication;


