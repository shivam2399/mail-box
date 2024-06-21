import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Auth from './Components/Auth';

const router = createBrowserRouter([
  {path: '/', element: <Auth />},
])


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
