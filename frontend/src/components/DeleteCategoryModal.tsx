import { Button, Modal } from 'react-bootstrap';

interface Props {
  show: boolean,
  id: number,
  handleClose: () => void,
  handleDelete: (id: number) => void,
}

function DeleteCategoryModal(props: Props) {
  const {
    show,
    id,
    handleClose,
    handleDelete,
  } = props;

  return (
    <Modal
      centered
      backdrop="static"
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this category?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => {
          handleDelete(id);
          handleClose();
          window.location.reload();
        }}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteCategoryModal
