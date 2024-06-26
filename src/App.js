import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Auth from './Components/Auth';
import Compose from './Components/Compose';
import Welcome from './Components/Welcome';
import Inbox from './Components/Inbox';

const router = createBrowserRouter([
  {path: '/', element: <Auth />},
  {path: '/compose', element: <Compose />},
  {path: '/welcome', element: <Welcome />},
  {path: '/inbox', element: <Inbox />},
])


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
