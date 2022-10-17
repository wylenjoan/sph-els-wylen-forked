import axios from "axios"
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import useAuth from "../../hooks/useAuth"
import { Lesson } from "../../interfaces/lesson"
import { listLessonsByUser } from "../../apiClient/lessonService"
import CorrectIcon from "../../components/CorrectIcon"
import WrongIcon from "../../components/WrongIcon"
import Avatar from "../../components/Avatar"

function WordsLearned() {
  const { user } = useAuth()

  const [lessons, setLessons] = useState<Lesson[]>([])
  const [wordsNum, setWordsNum] = useState<number>(0);

  async function listLessons() {
    try {
      const response = await listLessonsByUser(user.id)
      const lessonsData = response.data

      for (let item of lessonsData) {
        setLessons(prevState => [
          ...prevState,
          {
            id: item.id,
            userId: item.user,
            categoryId: item.category,
            categoryTitle: item.category_title,
            answers: item.answers,
          }
        ]);
        setWordsNum(prevState => prevState + item.answers.length);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`${err.request.status} ${err.request.statusText}`);
      }
    }
  }

  useEffect(() => {
    listLessons();
  }, [user])

  const renderLessons = lessons && (
    lessons.map((lesson) => (
      <div key={lesson.id} className="py-3">
        <h5 className="me-auto">{lesson.categoryTitle}</h5>
        <Table striped>
          <thead>
            <tr>
              <td></td>
              <th>Word</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {lesson.answers.map(({ id, value, is_correct, question_value }) => (
              <tr key={id}>
                <td>{is_correct ? <CorrectIcon /> : <WrongIcon />}</td>
                <td>{question_value}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    ))
  )

  return (
    <div className="sm-container d-flex flex-column pt-5">
      <div className="d-flex align-items-center gap-5 m-auto">
        <Avatar avatarUrl={user.avatar_url} className="sm-avatar" />
        <div>
          <h5>{user.first_name} {user.last_name}</h5>
          <p>Learned {wordsNum} words</p>
        </div>
      </div>

      <hr />

      <div className="flex-fill mt-3">
        <h2>Words Learned</h2>
        {renderLessons}
      </div>
    </div>
  )
}

export default WordsLearned
