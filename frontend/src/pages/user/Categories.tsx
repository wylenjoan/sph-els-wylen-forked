import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Card, Col, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { listCategories } from "../../apiClient/categoryService";
import { createLesson } from "../../apiClient/lessonService";
import routes from "../../constants/routes";
import useAuth from "../../hooks/useAuth";
import { Category } from "../../interfaces/category"
import { LessonCreation } from "../../interfaces/lesson";

function Categories() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [categories, setCategories] = useState<Category[]>([])

  async function listAllCategories() {
    try {
      const allCategories = (await listCategories()).data;
      setCategories(allCategories);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`${err.request.status} ${err.request.statusText}`)
      }
    }
  }

  useEffect(() => {
    listAllCategories();
  }, [])

  function handleNavigateLesson(lessonId: number) {
    navigate({
      pathname: routes.LESSON,
      search: `?id=${lessonId}`
    })
  }

  async function createNewLesson(categoryId: number, userId: number) {
    try {
      const newLesson: LessonCreation = {
        categoryId,
        userId,
      }
      let response = await createLesson(newLesson);
      handleNavigateLesson(response.data.id);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`${err.request.status} ${err.request.statusText}`)
      }
    };
  }

  return (
    <div className="container pt-5">
      <h2>Categories</h2>
      <Row xs={1} md={2} xl={4} className="g-4 pt-4">
        {categories.map(({ id, title, description }) => (
          <Col key={id}>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                  {description}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => createNewLesson(id, user.id)}
                >
                  Start lesson
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Categories
