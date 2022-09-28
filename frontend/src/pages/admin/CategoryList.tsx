import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import { deleteCategory, getCategory, listCategories, updateCategory } from "../../apiClient/categoryService";
import DeleteCategoryModal from "../../components/DeleteCategoryModal";
import EditCategoryModal from "../../components/EditCategoryModal";
import Category from "../../interfaces/category"

function CategoryList() {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category>({
    title: "",
    description: ""
  })

  useEffect(() => {
    listAllCategories();
  }, [])

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

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

  async function getCurrentCategory(id: number) {
    try {
      const category = (await getCategory(id)).data;
      if (category) {
        setCurrentCategory(category)
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`${err.request.status} ${err.request.statusText}`)
      }
    }
  }

  async function updateCurrentCategory(category: Category) {
    try {
      await updateCategory(category);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`${err.request.status} ${err.request.statusText}`)
      }
    }
  }

  async function deleteCurrentCategory(id: number) {
    try {
      await deleteCategory(id);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`${err.request.status} ${err.request.statusText}`)
      }
    }
  }

  return (
    <div className="container pt-5">
      <h2>Categories</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(({ id, title, description }) => (
            <tr key={id} >
              <td>{title}</td>
              <td>{description}</td>
              <td>
                <Button
                  size="sm"
                  variant="secondary"
                  className="me-2"
                >
                  Add word
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  className="me-2"
                  onClick={() => {
                    getCurrentCategory(id ?? 0);
                    handleShowEditModal()
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    getCurrentCategory(id ?? 0);
                    handleShowDeleteModal()
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}

        </tbody>
      </Table>

      <EditCategoryModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        category={currentCategory}
        handleUpdate={updateCurrentCategory}
      />

      <DeleteCategoryModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={deleteCurrentCategory}
        id={currentCategory.id ?? 0}
      />
    </div>
  )
}

export default CategoryList
