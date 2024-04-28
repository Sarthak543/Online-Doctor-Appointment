import React, { useContext, useEffect } from 'react'
import documentContext from '../context/Document_State/DocumentContext'

export default function SignIn() {
  const { signIn, setSignIn } = useContext(documentContext)
  let signInType = ""
  useEffect(() => {
    /*
    Instead of creating two forms for user and patient, we create a state signIn in documentContext
    whenever we come to this form from the home component the value of signIn is changed by the Home Component
    Here according to the signIn type(doctor/patient) we will make the request for log in purpose 
    signInType
    */
    signInType = signIn
    console.log(signInType)
    setSignIn("")
  }, [])

  const backgroundStyle = {
    position:'absolute',
    backgroundColor:'rgb(238,238,238)',
    height: '100vh',
    width: '100%',
    maxWidth: '100vw',
    zIndex: '-1'
  };

  return (
    <>
      {/* Log in form */}
      <div style={backgroundStyle}></div>
      <div className="container w-25" style={{marginTop:'15vh'}}>
        <div className='border border-dark rounded bg-white'>
          <p className='fs-1  text-center'>Log in</p>
          <form className='m-4 p-4'>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" />
            </div>
            <div class="mb-3 form-check pl-1">
              <input type="checkbox" class="form-check-input" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}
