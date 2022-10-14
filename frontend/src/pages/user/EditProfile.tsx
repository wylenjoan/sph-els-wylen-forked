import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap"
import useAuth from "../../hooks/useAuth"
import { updateUser } from "../../apiClient/userService";
import { UserProfile } from "../../interfaces/user";
import Avatar from "../../components/Avatar";


function EditProfile() {
  const { user, setUser } = useAuth();

  const [alert, setAlert] = useState({
    message: '',
    is_success: false
  })

  const [profile, setProfile] = useState<UserProfile>({
    id: 0,
    first_name: '',
    last_name: '',
    avatar_url: ''
  })

  useEffect(() => {
    setProfile({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar_url: user.avatar_url
    })
  }, [user])

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { id, value }
    } = event

    setProfile(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      let response = await updateUser(profile);
      setUser({
        id: user.id,
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: user.email,
        is_admin: user.is_admin,
        avatar_url: profile.avatar_url,
      })
      setProfile({
        id: response.data.id,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        avatar_url: response.data.avatar_url,
      })
      setAlert({
        message: 'Your profile was successfully updated!',
        is_success: true
      })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setAlert({
          message: `${err.request.status} ${err.request.statusText}`,
          is_success: false
        })
      }
    }
  };

  const renderAlert = alert.message && (
    <Alert variant={alert.is_success ? 'success' : 'danger'}>
      {alert.message}
    </Alert>
  )

  return (
    <div className="sm-container pt-5">
      <h2>Edit My Profile</h2>

      <div className="d-flex justify-content-center my-4">
        <Avatar avatarUrl={user.avatar_url} className="md-avatar" />
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="first_name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            required
            value={profile.first_name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="last_name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your last name"
            required
            value={profile.last_name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="avatar_url">
          <Form.Label>Avatar URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the url of your avatar"
            value={profile.avatar_url}
            onChange={handleInputChange}
          />
        </Form.Group>

        {renderAlert}

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  )
}

export default EditProfile
