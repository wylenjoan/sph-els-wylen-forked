import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Col, Row, Stack } from 'react-bootstrap'
import { Category } from '../../interfaces/category';
import { Lesson } from '../../interfaces/lesson'
import { AnswerCreation } from '../../interfaces/answer';
import { getLesson } from '../../apiClient/lessonService';
import { getCategory } from '../../apiClient/categoryService';
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
    categoryTitle: "",
    answers: []
  })
  const [category, setCategory] = useState<Category>({
    id: 0,
    title: "",
    description: "",
    questions: [{
      id: 0,
      category: 0,
      value: '',
      choices: [{
        id: 0,
        question: 0,
        value: '',
        is_correct_answer: false,
      }]
    }]
  })
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  async function getCurrentLessonAndCategory() {
    try {
      const lessonResponse = await getLesson(lessonId);
      const lessonData = lessonResponse.data;
      if (lessonData) {
        setLesson({
          id: lessonData.id,
          userId: lessonData.user,
          categoryId: lessonData.category,
          answers: lessonData.answers,
          categoryTitle: lessonData.category_title
        });

        const categoryResponse = await getCategory(lessonData.category);
        const categoryData = categoryResponse.data;
        if (category) {
          setCategory({
            id: categoryData.id,
            title: categoryData.title,
            description: categoryData.description,
            questions: categoryData.questions
          });
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`${err.request.status} ${err.request.statusText}`)
      }
    }
  }

  useEffect(() => {
    getCurrentLessonAndCategory()
  }, [lessonId])


  async function handleClick(index: number) {
    if (currentIndex < category.questions.length) {
      try {
        const selectedChoice = category.questions[currentIndex].choices[index];
        if (selectedChoice) {
          const answer: AnswerCreation = {
            lesson: lesson.id,
            question: category.questions[currentIndex].id,
            choice: selectedChoice.id,
            value: selectedChoice.value,
            is_correct: selectedChoice.is_correct_answer
          }
          await createAnswer(answer);
          setCurrentIndex(prevState => prevState + 1);
          if (currentIndex + 1 === category.questions.length) {
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

  const renderQuestion = category.questions.length ? (
    <div className="pt-5">
      <h1>{category.questions[currentIndex].value}</h1>
      <Row xs={1} md={2} className="g-2 pt-5">
        {category.questions[currentIndex].choices.map((choice, index) => (
          <Col className="d-grid" key={index}>
            <Button
              variant="outline-primary"
              onClick={() => handleClick(index)}
            >
              {choice.value}
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  ) : <p className="fst-italic text-center">No questions in this category yet</p>

  const renderProgress = category.questions.length ? (
    <h5>{currentIndex + 1} out of {category.questions.length}</h5>
  ) : ''

  return (
    <div className="sm-container pt-5">
      <Stack direction="horizontal">
        <h5 className="me-auto">{lesson.categoryTitle}</h5>
        {renderProgress}
      </Stack>
      {renderQuestion}
    </div>
  )
}

export default LessonAnswer
