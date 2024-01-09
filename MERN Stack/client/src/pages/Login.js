import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setRole }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function loginUser(event) {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (data.user) {
                const token = data.user;
                localStorage.setItem('token', token);
                alert('Login successful');
                requestUserRole(token);
            } else {
                alert('Please check username or password');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    const requestUserRole = async (token) => {
        try {
            const response = await fetch('http://localhost:8000/api/getUserRole', {
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            });

            console.log("jjjjjjjjj", response)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Invalid content type. Expected JSON.');
            }
            const data = await response.json();
            const userRole = data.role;

            console.log(`User role: ${userRole}`);
            setRole(userRole);
            if (userRole === 'SuperAdmin') {
                navigate('/admin');
            } else if (userRole === 'Admin') {
                navigate('/staff');
            } else if (userRole === 'User') {
                navigate('/user');
            } else {
                console.error('Unexpected user role');
            }
        } catch (error) {
            console.error('Error fetching user role:', error);
        }
    };



    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
