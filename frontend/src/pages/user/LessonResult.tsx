import axios from 'axios';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Stack, Table } from 'react-bootstrap'
import Result from '../../interfaces/result';
import { Category } from '../../interfaces/category';
import { Lesson } from '../../interfaces/lesson';
import { Answer } from '../../interfaces/answer';
import { getLesson } from '../../apiClient/lessonService';
import { getCategory } from '../../apiClient/categoryService';
import { listAnswersByLesson } from '../../apiClient/answerService';
import { getQuestion } from '../../apiClient/questionService';

function LessonResult() {
  let [searchParams] = useSearchParams();
  const lessonId = Number(searchParams.get("lesson"));

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
  const [results, setResults] = useState<Result[]>([]);
  const [score, setScore] = useState<number>(0);

  async function getCurrentResult() {
    try {
      const lessonResponse = await getLesson(lessonId);
      const lessonData = lessonResponse.data;
      if (lesson) {
        setLesson(lessonData);

        const categoryResponse = await getCategory(lessonData.category);
        const categoryData = categoryResponse.data;
        setCategory(categoryData);

        const answersResponse = await listAnswersByLesson(lessonId);
        const answersData = answersResponse.data;

        for (let { id, value, is_correct, question } of answersData) {
          const questionResponse = await getQuestion(question);
          const questionValue = questionResponse.data.value;
          setResults(prevState => [
            ...prevState,
            {
              id,
              value,
              is_correct,
              word: questionValue,
            }
          ])
        }

        setScore(answersData.filter((answer: Answer) => answer.is_correct).length)
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`${err.request.status} ${err.request.statusText}`)
      }
    }
  }

  useMemo(() => {
    if (lessonId) {
      getCurrentResult();
    }
  }, [lessonId]);

  const correctIcon = <i className="bi-check-circle-fill correct"></i>;
  const wrongIcon = <i className="bi-x-octagon-fill wrong"></i>;

  return (
    <div className="sm-container pt-5">
      <Stack direction="horizontal">
        <h5 className="me-auto">{category.title}</h5>
        <h5>Result: {score} of {results.length}</h5>
      </Stack>
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>Word</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {results.map(({ id, value, is_correct, word }, index) => (
            <tr key={id}>
              <td>{is_correct ? correctIcon : wrongIcon}</td>
              <td>{word}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default LessonResult
