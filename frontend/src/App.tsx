import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './constants/routes';
import Registration from './pages/Registration';
import Login from './pages/Login';
import PrivateRoute from './pages/PrivateRoute';
import CategoryList from './pages/admin/CategoryList';
import UserList from './pages/admin/UserList';
import AddCategory from './pages/admin/AddCategory';
import Categories from './pages/user/Categories';
import LessonAnswer from './pages/user/LessonAnswer';
import LessonResult from './pages/user/LessonResult';
import EditProfile from './pages/user/EditProfile';
import WordsLearned from './pages/user/WordsLearned';
import Profile from './pages/user/Profile';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.REGISTRATION} element={<Registration />} />
        <Route path={routes.LOGIN} element={<Login />} />

        <Route path={routes.ROOT} element={<PrivateRoute />}>
          <Route path={routes.CATEGORY_LIST} element={<CategoryList />} />
          <Route path={routes.ADD_CATEGORY} element={<AddCategory />} />
          <Route path={routes.USER_LIST} element={<UserList />} />
          <Route path={routes.CATEGORIES} element={<Categories />} />
          <Route path={routes.LESSON} element={<LessonAnswer />} />
          <Route path={routes.RESULT} element={<LessonResult />} />
          <Route path={routes.EDIT_PROFILE} element={<EditProfile />} />
          <Route path={routes.WORDS_LEARNED} element={<WordsLearned />} />
          <Route path={routes.PROFILE} element={<Profile />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
