import { useState } from 'react'
import axios from "axios";
import { Alert, Button, Form } from 'react-bootstrap';
import apiUrls from "../constants/apiUrls"
import axiosConfig from '../constants/axiosConfig';
import User from '../interfaces/user';

const client = axios.create(axiosConfig);

function Registration() {
  const emptyUser = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    is_admin: false,
  };

  const [user, setUser] = useState<User>(emptyUser)
  const [error, setError] = useState<string>('')

  async function registerUser() {
    try {
      await client.post(`${apiUrls.REGISTRATION}`, user)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`${err.request.status} ${err.request.statusText}`);
      }
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { id, value, checked }
    } = event

    setUser(prevState => ({
      ...prevState,
      [id]: id === 'is_admin' ? checked : value
    }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    registerUser();
    setUser(emptyUser);
    setError('')
  }

  const renderAlert = error ? (
    <Alert variant='danger'>
      {error}
    </Alert>
  ) : error


  return (
    <div className='sm-container'>
      <h2>Registration</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="first_name">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={user.first_name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="last_name">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={user.last_name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={user.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="is_admin">
          <Form.Check
            type="checkbox"
            label="I'm an admin"
            checked={user.is_admin}
            onChange={handleInputChange}
          />
        </Form.Group>

        {renderAlert}

        <Button variant="primary" type="submit">
          Create account
        </Button>
      </Form>
    </div>
  )
}

export default Registration
