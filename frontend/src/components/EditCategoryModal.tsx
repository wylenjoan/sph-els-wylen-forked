import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Category, CategoryCreation } from '../interfaces/category';

interface Props {
  show: boolean,
  category: Category,
  handleClose: () => void,
  handleUpdate: (category: CategoryCreation) => void,
}

function EditCategoryModal(props: Props) {
  const {
    show,
    category,
    handleClose,
    handleUpdate
  } = props;

  const [updatedCategory, setUpdatedCategory] = useState<CategoryCreation>({
    id: 0,
    title: "",
    description: ""
  });

  useEffect(() => {
    setUpdatedCategory({
      id: category.id,
      title: category.title,
      description: category.description
    })
  }, [category])

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { id, value }
    } = event

    setUpdatedCategory(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  return (
    <Modal
      centered
      backdrop="static"
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              required
              value={updatedCategory.title}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              required
              value={updatedCategory.description}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => {
          handleUpdate(updatedCategory);
        }}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditCategoryModal
