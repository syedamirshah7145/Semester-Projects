import './App.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import { createBrowserRouter,Navigate,RouterProvider, } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import Profile from './pages/Profile'
import Friends from './pages/Friends';
import Page from './pages/Page';
import PageList from './components/PageList';
import Message from './pages/Message'
import People from './pages/People';


const router = createBrowserRouter([
  {
    path: '/people',
    element : <People />
  },
  {
    path:'/',
    element:<Navigate to="/login" />
  },
  {
    path: "/home/:userId",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/createuser",
    element: <SignUp />
  },
  {
    path: "/profile/:userId",
    element: <Profile />
  },
  {
    path: "/friends/:userid",
    element: <Friends/>
  },
  {
    path:"/pages",
    element: <PageList />
  },
  {
    path:"/pages/:pageId",
    element: <Page />
  },
  {
    path:'/message',
    element:<Message />
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;