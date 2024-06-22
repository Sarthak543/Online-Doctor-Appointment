import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import DocterRegisteration from './components/DocterRegisteration';
import Home from './components/Home';
import NavBar from './components/NavBar';
import DocumentState from './context/Document_State/DocumentState';
import PatientState from './context/Patient_State/PatientState';
import Form1 from './components/Form1';
import Form2 from './components/Form2';
import SignIn from './components/SignIn';
import PatientRegistration from './components/PatientRegistration';
import Register from './components/Register';
import DoctorPanel from './components/Doctor Panel/DoctorPanel';
import CheckAppointment from './components/Doctor Panel/CheckAppointment';
import AppointmentHistory from './components/Doctor Panel/AppointmentHistory';
import FeedBack from './components/Doctor Panel/FeedBack'
import PatientPanel from './components/Patient Panel/PatientPanel';
import BookAppointment from './components/Patient Panel/BookAppointment';
import ConsultantHistory from './components/Patient Panel/ConsultantHistory';
import ViewBookedAppointment from './components/Patient Panel/ViewBookedAppointment';
import Appointment_Calender from './components/Patient Panel/Appointment_Calender';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        { path: "DocterRegistration", element: <DocterRegisteration /> }, // Default route within DoctorRegistration
        { path: "/DocterRegistration/form1", element: <Form1 /> },
        { path: "/DocterRegistration/form2", element: <Form2 /> }
      ]
    },
    {
      path: 'signIn',
      element: <SignIn />
    },
    {
      path: 'PatientRegistration',
      element: <PatientRegistration />
    },
    {
      path: 'Register',
      element: <Register />
    },
    {
      path: 'DoctorPanel',
      element: <DoctorPanel />,
      children: [
        { path: "/DoctorPanel/check-appointment", element: <CheckAppointment /> },
        { path: "/DoctorPanel/consultant-history", element: <AppointmentHistory /> },
        { path: "/DoctorPanel/feedback", element: <FeedBack /> }
      ]
    },
    {
      path: 'PatientPanel',
      element: <PatientPanel />,
      children: [
        { path: "/PatientPanel/bookAppointment", element: <BookAppointment /> },
        { path: "/PatientPanel/ConsultantHistory", element: <ConsultantHistory /> },
        { path: "/PatientPanel/viewBookedAppointment", element: <ViewBookedAppointment /> },
        { path: "/PatientPanel/date", element: <Appointment_Calender /> }
      ]
    }
  ])
  return (
    <>
      <DocumentState>
        <PatientState>
          <NavBar />
          <RouterProvider router={router} />
        </PatientState>
      </DocumentState>
      <ToastContainer
        position="top-center"
        theme="dark"
      />
    </>
  );
}

export default App;
