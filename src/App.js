import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import DocterRegisteration from './components/DocterRegisteration';
import Home from './components/Home';
import NavBar from './components/NavBar';
import DocumentState from './context/Document_State/DocumentState';
import Form1 from './components/Form1';
import Form2 from './components/Form2';
import SignIn from './components/SignIn';
import PatientRegistration from './components/PatientRegistration';
import Register from './components/Register';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/DocterRegistration",
      element: <DocterRegisteration />,
      children: [
        { path: "/DocterRegistration", element: <DocterRegisteration/> }, // Default route within DoctorRegistration
        { path: "/DocterRegistration/form1", element: <Form1/> },
        { path: "/DocterRegistration/form2", element: <Form2/> }
      ]
    },
    {
      path:'signIn',
      element: <SignIn/>
    },
    {
      path:'PatientRegistration',
      element: <PatientRegistration/>
    },
    {
      path:'Register',
      element:<Register/>
    }
  ])
  return (
    <>
      <DocumentState>
        <NavBar />
        <RouterProvider router={router} />
      </DocumentState>
    </>
  );
}

export default App;
