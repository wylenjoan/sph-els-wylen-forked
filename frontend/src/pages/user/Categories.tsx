import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Card, Col, Row } from "react-bootstrap"
import { listCategories } from "../../apiClient/categoryService";
import Category from "../../interfaces/category"

function Categories() {
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
                <Button variant="primary">Start lesson</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Categories
