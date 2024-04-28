import React, { useContext, useEffect } from 'react';
import DocumentContext from '../context/Document_State/DocumentContext';
import {
  Outlet,
} from 'react-router-dom'

export default function DocterRegisteration() {
  const a = useContext(DocumentContext);
  const { bg, setbg } = a

  useEffect(() => {
    setbg('../dr-registration-bg.jpg'); // Replace with actual logic
  }, [setbg]);


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
    zIndex: '-1',
    filter: 'blur(8px)'
  };

  return (
    <>
      <div style={backgroundStyle}></div>
      <div className="container w-50 mt-5 p-2 d-flex justify-content-center" >
      <Outlet/>
      </div>
    </>
  )
}

