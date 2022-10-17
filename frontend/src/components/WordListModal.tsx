import { Button, Card, ListGroup, Modal, Stack } from 'react-bootstrap';
import { Category } from '../interfaces/category';

interface Props {
  show: boolean,
  category: Category,
  handleClose: () => void,
}

function WordListModal(props: Props) {
  const {
    show,
    category,
    handleClose,
  } = props;

  const renderWordList = category.questions.length > 0 ? (
    category.questions.map(({ id, value, choices }) => (
      <Card key={id} className="mb-3">
        <Card.Header>{value}</Card.Header>
        <ListGroup variant="flush">
          {choices?.map(({ id, value, is_correct_answer }) => (
            <ListGroup.Item key={id} variant={is_correct_answer ? 'success' : ''}>
              <div className='d-flex align-items-center'>
                {value}
                {is_correct_answer && <i className="bi-check correct ps-1"></i>}
              </div>

            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    ))
  ) : <p className="fst-italic text-center">No words in this category</p>

  return (
    <Modal
      centered
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{category.title} - Word List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderWordList}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default WordListModal
