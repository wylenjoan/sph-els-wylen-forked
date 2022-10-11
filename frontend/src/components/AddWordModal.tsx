import { useEffect, useState } from 'react';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap'
import { ChoiceCreation } from '../interfaces/choice';
import { QuestionCreation } from '../interfaces/question';

interface Props {
  show: boolean,
  categoryId: number,
  handleClose: () => void,
  handleCreateQuestionWithChoices: (word: QuestionCreation, choice: ChoiceCreation[]) => void
}

function AddWordModal(props: Props) {
  const {
    show,
    categoryId,
    handleClose,
    handleCreateQuestionWithChoices,
  } = props;

  const emptyChoiceValues = [
    { value: "", is_correct_answer: false },
    { value: "", is_correct_answer: false },
    { value: "", is_correct_answer: false },
    { value: "", is_correct_answer: false },
  ]

  const [word, setWord] = useState<QuestionCreation>({ value: "" });
  const [choices, setChoices] = useState<ChoiceCreation[]>(emptyChoiceValues);

  useEffect(() => {
    setWord(prevState => ({
      ...prevState,
      category: categoryId
    }))
  }, [categoryId])

  function handleCloseModal() {
    setChoices(emptyChoiceValues);
    setWord({ value: "" });
    handleClose();
  }

  function handleWordInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { value }
    } = event

    setWord(prevState => ({
      ...prevState,
      value
    }))
  }

  function handleChoicesInputChange(index: number, event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { value, checked, type }
    } = event

    const choicesCopy = [...choices];

    if (type === "checkbox") {
      choicesCopy[index] = {
        value: choicesCopy[index].value,
        is_correct_answer: checked
      }
    } else {
      choicesCopy[index] = {
        value,
        is_correct_answer: choicesCopy[index].is_correct_answer
      }
    }

    setChoices(choicesCopy);
  }

  return (
    <Modal
      centered
      backdrop="static"
      show={show}
      onHide={handleCloseModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add new word</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Word</Form.Label>
            <input
              className="form-control"
              placeholder="Enter word"
              required
              value={word.value}
              onChange={handleWordInputChange}
            />
          </Form.Group>

          <Form.Label>Choices</Form.Label>

          {choices.map(({ value, is_correct_answer }, index) => (
            <Row className="align-items-center mb-3" key={index}>
              <Col>
                <input
                  className="form-control"
                  placeholder="Enter choice"
                  required
                  value={value}
                  onChange={(event) => handleChoicesInputChange(index, event)}
                />
              </Col>
              <Col>
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  checked={is_correct_answer}
                  onChange={(event) => handleChoicesInputChange(index, event)}
                />
                <label className="form-check-label">
                  Correct answer
                </label>
              </Col>
            </Row>
          ))}

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button variant="secondary" onClick={() => {
          handleCreateQuestionWithChoices(word, choices)
        }}>
          Add new word
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddWordModal
