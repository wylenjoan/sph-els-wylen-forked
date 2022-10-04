import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import { deleteCategory, getCategory, listCategories, updateCategory } from "../../apiClient/categoryService";
import { createChoice } from "../../apiClient/choiceService";
import { createQuestion } from "../../apiClient/questionService";
import AddWordModal from "../../components/AddWordModal";
import DeleteCategoryModal from "../../components/DeleteCategoryModal";
import EditCategoryModal from "../../components/EditCategoryModal";
import WordListModal from "../../components/WordListModal";
import { Category } from "../../interfaces/category"
import { ChoiceCreation } from "../../interfaces/choice";
import { QuestionCreation } from "../../interfaces/question";

function CategoryList() {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showAddWordModal, setShowAddWordModal] = useState<boolean>(false);
  const [showWordListModal, setShowWordListModal] = useState<boolean>(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category>({
    id: 0,
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

  const handleCloseAddWordModal = () => setShowAddWordModal(false);
  const handleShowAddWordModal = () => setShowAddWordModal(true);

  const handleCloseWordListModal = () => setShowWordListModal(false);
  const handleShowWordListModal = () => setShowWordListModal(true);


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
      handleCloseEditModal();
      window.location.reload();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`${err.request.status} ${err.request.statusText}`)
      }
    }
  }

  async function deleteCurrentCategory(id: number) {
    try {
      await deleteCategory(id);
      handleCloseDeleteModal();
      window.location.reload();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`${err.request.status} ${err.request.statusText}`)
      }
    }
  }

  async function createQuestionWithChoices(word: QuestionCreation, choices: ChoiceCreation[]) {
    try {
      const response = await createQuestion(word);
      const questionId = response.data.id;
      for (let choice of choices) {
        await createChoice({
          ...choice,
          question: questionId
        })
      }
      handleCloseAddWordModal();
      window.location.reload();
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
                  variant="light"
                  className="me-2"
                  onClick={() => {
                    getCurrentCategory(id ?? 0);
                    handleShowWordListModal()
                  }}
                >
                  Word List
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="me-2"
                  onClick={() => {
                    getCurrentCategory(id ?? 0);
                    handleShowAddWordModal()
                  }}
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

      <WordListModal
        show={showWordListModal}
        handleClose={handleCloseWordListModal}
        categoryId={currentCategory.id ?? 0}
      />

      <AddWordModal
        show={showAddWordModal}
        handleClose={handleCloseAddWordModal}
        categoryId={currentCategory.id ?? 0}
        handleCreateQuestionWithChoices={createQuestionWithChoices}
      />

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
