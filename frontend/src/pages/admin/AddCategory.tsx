import axios from "axios"
import { useState } from "react"
import { Alert, Button, Form } from "react-bootstrap"
import { createCategory } from "../../apiClient/categoryService"
import { CategoryCreation } from "../../interfaces/category"

function AddCategory() {
  const emptyCategory = {
    title: "",
    description: ""
  }

  const [category, setCategory] = useState<CategoryCreation>(emptyCategory)
  const [alert, setAlert] = useState({
    message: '',
    is_success: false
  })

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { id, value }
    } = event

    setCategory(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await createCategory(category);
      setCategory(emptyCategory);
      setAlert({
        message: 'Category successfully created!',
        is_success: true
      })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setAlert({
          message: `${err.request.status} ${err.request.statusText}`,
          is_success: false
        })
      }
    };
  }

  const renderAlert = alert.message ? (
    <Alert variant={alert.is_success ? 'success' : 'danger'}>
      {alert.message}
    </Alert>
  ) : ''

  return (
    <div className="sm-container pt-5">
      <h2>Add Category</h2>

      <Form method="POST" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            required
            value={category.title}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            required
            value={category.description}
            onChange={handleInputChange}
          />
        </Form.Group>

        {renderAlert}

        <Button variant="primary" type="submit">
          Add new category
        </Button>
      </Form>
    </div>
  )
}

export default AddCategory
