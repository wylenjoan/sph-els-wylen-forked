import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Col, Row, Stack } from 'react-bootstrap'
import { Category } from '../../interfaces/category';
import { Question } from '../../interfaces/question';
import { Lesson } from '../../interfaces/lesson'
import { AnswerCreation } from '../../interfaces/answer';
import { getLesson } from '../../apiClient/lessonService';
import { getCategory } from '../../apiClient/categoryService';
import { listQuestionsByCategory } from '../../apiClient/questionService';
import { listChoicesByQuestion } from '../../apiClient/choiceService';
import { createAnswer } from '../../apiClient/answerService';
import routes from '../../constants/routes';

function LessonAnswer() {
  const navigate = useNavigate()
  let [searchParams] = useSearchParams();
  const lessonId = Number(searchParams.get("id"));

  const [lesson, setLesson] = useState<Lesson>({
    id: 0,
    userId: 0,
    categoryId: 0,
    answers: []
  })
  const [category, setCategory] = useState<Category>({
    id: 0,
    title: "",
    description: ""
  })
  const [words, setWords] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  async function getCurrentLesson(id: number) {
    try {
      const responseData = (await getLesson(id)).data;
      const lessonData: Lesson = {
        id: responseData.id,
        userId: responseData.user,
        categoryId: responseData.category,
        answers: responseData.answers
      };
      if (lessonData) {
        setLesson(lessonData);
        getCurrentCategory(lessonData.categoryId);
        listWordsFromCategory(lessonData.categoryId);
      }

    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`${err.request.status} ${err.request.statusText}`)
      }
    }
  }

  async function getCurrentCategory(categoryId: number) {
    try {
      const response = await getCategory(categoryId);
      const category = response.data;
      if (category) {
        setCategory(category);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`${err.request.status} ${err.request.statusText}`)
      }
    }
  }

  async function listWordsFromCategory(categoryId: number) {
    try {
      const response = await listQuestionsByCategory(categoryId);
      const wordsData = response.data;
      setWords(wordsData);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`${err.request.status} ${err.request.statusText}`)
      }
    }
  }

  useEffect(() => {
    if (lessonId) {
      getCurrentLesson(lessonId);
      setCurrentIndex(0);
    }
  }, [lessonId])


  async function handleClick(index: number, questionId: number) {
    if (currentIndex < words.length) {
      try {
        const response = await listChoicesByQuestion(questionId);
        const choicesData = response.data;
        const selectedChoice = choicesData[index];
        if (selectedChoice) {
          const answer: AnswerCreation = {
            lesson: lesson.id,
            question: questionId,
            choice: selectedChoice.id,
            value: selectedChoice.value,
            is_correct: selectedChoice.is_correct_answer
          }
          await createAnswer(answer);
          setCurrentIndex(prevState => prevState + 1);
          if (currentIndex + 1 === words.length) {
            navigate({
              pathname: routes.RESULT,
              search: `?lesson=${lessonId}`
            })
          }
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log(`${err.request.status} ${err.request.statusText}`)
        }
      }
    }
  }

  const renderQuestion = words.length && (
    <div className="pt-5">
      <h1>{words[currentIndex].value}</h1>
      <Row xs={1} md={2} className="g-2 pt-5">
        {words[currentIndex].choices.map((choice, index) => (
          <Col className="d-grid" key={index}>
            <Button
              variant="outline-primary"
              onClick={() => handleClick(index, words[currentIndex].id)}
            >
              {choice}
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  )

  return (
    <div className="sm-container pt-5">
      <Stack direction="horizontal">
        <h5 className="me-auto">{category.title}</h5>
        <h5>{currentIndex + 1} out of {words.length}</h5>
      </Stack>
      {renderQuestion}
    </div>
  )
}

export default LessonAnswer
