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
import AdminPanel from './components/Admin/AdminPanel';
import BookAppointment from './components/Patient Panel/BookAppointment';
import ConsultantHistory from './components/Patient Panel/ConsultantHistory';
import UpcomingAppointment from './components/Doctor Panel/UpcomingAppointment';
import ViewBookedAppointment from './components/Patient Panel/ViewBookedAppointment';
import Appointment_Calender from './components/Patient Panel/Appointment_Calender';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatWindow from './components/Chat Panel/ChatWindow';
import { WebSocketProvider } from './components/Chat Panel/WebSocketContext';
import ShowChat from './components/Chat Panel/ShowChat';
import Patients from './components/Admin/Patients';
import Doctors from './components/Admin/Doctors';
import TotalAppoinntments from './components/Admin/TotalAppoinntments';
import Feedbacks from './components/Admin/Feedbacks';
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
        { path: "/DoctorPanel/check-appointment/Consult", element: <ChatWindow /> },
        { path: "/DoctorPanel/upcoming-appointment", element: <UpcomingAppointment /> },
        { path: "/DoctorPanel/consultant-history", element: <AppointmentHistory /> },
        { path: "/DoctorPanel/consultant-history/showChat", element: <ShowChat /> },
        { path: "/DoctorPanel/feedback", element: <FeedBack /> }
      ]
    },
    {
      path: 'PatientPanel',
      element: <PatientPanel />,
      children: [
        { path: "/PatientPanel/bookAppointment", element: <BookAppointment /> },
        { path: "/PatientPanel/ConsultantHistory", element: <ConsultantHistory /> },
        { path: "/PatientPanel/ConsultantHistory/showChat", element: <ShowChat /> },
        { path: "/PatientPanel/viewBookedAppointment", element: <ViewBookedAppointment /> },
        { path: "/PatientPanel/viewBookedAppointment/Consult", element: <ChatWindow /> },
        { path: "/PatientPanel/date", element: <Appointment_Calender /> },
        { path: "/PatientPanel/feedback", element: <FeedBack /> }
      ]
    },
    {
      path: 'AdminPanel',
      element: <AdminPanel />,
      children: [
        { path: "/AdminPanel/patients", element: <Patients /> },
        { path: "/AdminPanel/doctors", element: <Doctors /> },
        { path: "/AdminPanel/all-appointments", element: <TotalAppoinntments /> },
        { path: "/AdminPanel/feedbacks", element: <Feedbacks /> }
      ]
    }
  ])
  return (
    <>
      <DocumentState>
        <PatientState>
          <WebSocketProvider>
            <NavBar />
            <RouterProvider router={router} />
          </WebSocketProvider>
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
