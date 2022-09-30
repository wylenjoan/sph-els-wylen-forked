import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Card, ListGroup, Modal } from 'react-bootstrap';
import { listQuestionsByCategory } from '../apiClient/questionService';
import Question from '../interfaces/question';

interface Props {
  show: boolean,
  categoryId: number,
  handleClose: () => void,
}

function WordListModal(props: Props) {
  const {
    show,
    categoryId,
    handleClose,
  } = props;

  useEffect(() => {
    listWordsFromCategory(categoryId);
  }, [categoryId])

  const [currentWords, setCurrentWords] = useState<Question[]>([])

  async function listWordsFromCategory(categoryId: number) {
    try {
      const wordsData = (await listQuestionsByCategory(categoryId)).data;
      setCurrentWords(wordsData);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`${err.request.status} ${err.request.statusText}`)
      }
    }
  }

  const renderWordList = currentWords.length > 0 ? (
    currentWords.map(({ id, value, choices }) => (
      <Card key={id} className="mb-3">
        <Card.Header>{value}</Card.Header>
        <ListGroup variant="flush">
          {choices?.map((choice, index) => (
            <ListGroup.Item key={index}>{choice}</ListGroup.Item>
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
        <Modal.Title>Word list</Modal.Title>
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
