import React, { useContext, useEffect } from 'react'
import documentContext from '../context/Document_State/DocumentContext'
import { Link } from 'react-router-dom';

export default function Register() {
    const a = useContext(documentContext)
    const { bg, setbg } = a
    const { signIn, setSignIn } = a
  
    useEffect(() => {
      setbg('../HomePage.jpg');
    }, []);
  
  
    const backgroundStyle = {
      position: 'absolute',
      backgroundImage: `url(${bg})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      height: '100vh',
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden',
      zIndex: '-1'
    };
  
    const imageStyle = {
      height: '28vh',
      width: '15vw',
      cursor: 'pointer',
    }

    return (
    <>
      <div style={backgroundStyle}></div>
      <div className="container text-center d-flex justify-content-center align-items-center" style={{ marginTop: '4vh', height: '15vh' }}>
        <span style={{ fontSize: '7vh' }}>Online Doctor Appointment</span>
      </div>
      <h3 className=" text-center">Register As</h3>
      <div className="container d-flex justify-content-center" style={{ marginTop: '12vh' }}>
        <div className="card-group">
          <div className="card me-5">
            <Link to={"/DocterRegistration/form1"}>
              <img src="../doctor.png" className="card-img-top" alt="..." name="Doctor" style={imageStyle} />
            </Link>
            <div className="card-body">
              <h5 className="card-title text-center">Doctor</h5>
            </div>
          </div>
          <div className="card">
            <Link to={"/PatientRegistration"}>
              <img src="../patient.png" className="card-img-top" alt="..." name="Patient" style={imageStyle} />
            </Link>
            <div className="card-body">
              <h5 className="card-title text-center">Patient</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
