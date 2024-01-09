import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('User')

  async function registerUser(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:8000/api/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role,
      })
    });
    const data = await response.json();
    if (data.status === 'ok') {
      navigate('/login')
    } else {
      alert(`Registration failed! ${data.error}`)
    }
    console.log(data);
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value='SuperAdmin'>Super Admin</option>
          <option value='Admin'>Admin</option>
          <option value='User'>User</option>
        </select>
        <input
          type="submit"
          value="Register"
        />
      </form>
    </div>
  );
}

export default Register;
