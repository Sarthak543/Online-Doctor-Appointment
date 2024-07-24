import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatWindow from './components/Chat Panel/ChatWindow';
import { WebSocketProvider } from './components/Chat Panel/WebSocketContext';
import ShowChat from './components/Chat Panel/ShowChat';
import Patients from './components/Admin/Patients';
import Doctors from './components/Admin/Doctors';
import TotalAppoinntments from './components/Admin/TotalAppoinntments';
import Feedbacks from './components/Admin/Feedbacks';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';
import About from './components/About';
import ContactUs from './components/ContactUs';
function App() {

  const [progress, setProgress] = useState(0)

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <NavBar /> {/* NavBar placed here */}
          <LoadingBar
            color='#f11946'
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <Outlet />
        </>
      ),
      children: [
        { path: '', element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'contact', element: <ContactUs /> },
        {
          path: 'DocterRegistration',
          element: <DocterRegisteration />,
          children: [
            { path: '', element: <DocterRegisteration /> }, // Default route within DoctorRegistration
            { path: 'form1', element: <Form1 /> },
            { path: 'form2', element: <Form2 /> },
          ],
        },
        { path: 'signIn', element: <SignIn loader={setProgress} /> },
        { path: 'PatientRegistration', element: <PatientRegistration /> },
        { path: 'Register', element: <Register /> },
        {
          path: 'DoctorPanel',
          element: <DoctorPanel />,
          children: [
            { path: 'check-appointment', element: <CheckAppointment loader={setProgress} /> },
            { path: 'check-appointment/Consult', element: <ChatWindow loader={setProgress} /> },
            { path: 'upcoming-appointment', element: <UpcomingAppointment loader={setProgress} /> },
            { path: 'consultant-history', element: <AppointmentHistory loader={setProgress} /> },
            { path: 'consultant-history/showChat', element: <ShowChat loader={setProgress} /> },
            { path: 'feedback', element: <FeedBack /> },
          ],
        },
        {
          path: 'PatientPanel',
          element: <PatientPanel />,
          children: [
            { path: 'bookAppointment', element: <BookAppointment loader={setProgress} /> },
            { path: 'ConsultantHistory', element: <ConsultantHistory loader={setProgress} /> },
            { path: 'ConsultantHistory/showChat', element: <ShowChat loader={setProgress} /> },
            { path: 'viewBookedAppointment', element: <ViewBookedAppointment loader={setProgress} /> },
            { path: 'viewBookedAppointment/Consult', element: <ChatWindow /> },
            { path: 'date', element: <Appointment_Calender /> },
            { path: 'feedback', element: <FeedBack /> },
          ],
        },
        {
          path: 'AdminPanel',
          element: <AdminPanel />,
          children: [
            { path: 'patients', element: <Patients loader={setProgress} /> },
            { path: 'doctors', element: <Doctors loader={setProgress} /> },
            { path: 'all-appointments', element: <TotalAppoinntments loader={setProgress} /> },
            { path: 'feedbacks', element: <Feedbacks loader={setProgress} /> },
          ],
        },
      ],
    },
  ]);


  return (
    <>
      <DocumentState>
        <PatientState>
          <WebSocketProvider>
            <RouterProvider router={router} />
          </WebSocketProvider>
        </PatientState>
      </DocumentState >
      <ToastContainer
        position="top-center"
        theme="dark"
      />
    </>
  );
}

export default App;
