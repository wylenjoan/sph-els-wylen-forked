import axios from 'axios';
import { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap';
import AuthCredentials from '../interfaces/authCredentials';
import { useNavigate } from 'react-router-dom';
import routes from '../constants/routes';
import { loginUser } from '../apiClient/authService';

function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState<string>('')
  const [credentials, setCredentials] = useState<AuthCredentials>({
    email: '',
    password: '',
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { id, value }
    } = event

    setCredentials(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      let response = await loginUser(credentials);
      localStorage.setItem('user', JSON.stringify(response.data.user))
      navigate(routes.ROOT, { replace: true })
      window.location.reload()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`${err.request.status} ${err.request.statusText}`);
      }
    }

  }

  const renderAlert = error ? (
    <Alert variant='danger'>
      {error}
    </Alert>
  ) : error

  return (
    <div className="sm-container pt-5">
      <h2>Login</h2>

      <Form onSubmit={handleSubmit} method="POST">
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={credentials.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {renderAlert}

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>

    </div>
  )
}

export default Login
