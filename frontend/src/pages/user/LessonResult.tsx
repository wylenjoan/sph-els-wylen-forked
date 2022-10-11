import axios from 'axios';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Stack, Table } from 'react-bootstrap'
import { Lesson } from '../../interfaces/lesson';
import { Answer } from '../../interfaces/answer';
import { getLesson } from '../../apiClient/lessonService';


function LessonResult() {
  let [searchParams] = useSearchParams();
  const lessonId = Number(searchParams.get("lesson"));

  const [lesson, setLesson] = useState<Lesson>({
    id: 0,
    userId: 0,
    categoryId: 0,
    categoryTitle: "",
    answers: [],
  })
  const [score, setScore] = useState<number>(0);

  async function getCurrentResult() {
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
        setScore(lessonData.answers.filter((answer: Answer) => answer.is_correct).length)
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
        <h5 className="me-auto">{lesson.categoryTitle}</h5>
        <h5>Result: {score} of {lesson.answers.length}</h5>
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
          {lesson.answers.map(({ id, value, is_correct, question_value }) => (
            <tr key={id}>
              <td>{is_correct ? correctIcon : wrongIcon}</td>
              <td>{question_value}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default LessonResult
