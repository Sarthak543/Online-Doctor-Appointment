import React, { useContext } from 'react'
import documentContext from '../context/Document_State/DocumentContext'

export default function PatientRegistration() {
    const backgroundStyle = {
        position: 'absolute',
        backgroundImage: `url('../dr-registration-bg.jpg')`,
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

    const { patData, setPatData } = useContext(documentContext);
    const onChangeHandler = (e) => {
        setPatData({ ...patData, [e.target.name]: e.target.value })
    }

    const handleSubmit= async(event)=>{
        event.preventDefault();
        const formData = new FormData();

        //appending all the data from patData to formData
        Object.keys(patData).forEach(key =>{
            formData.append(key,patData[key]);
        });

        //Including the file if uploaded
        const fileInput = document.querySelector('#inputGroupFile02');
        if(fileInput.files[0]){
            formData.append('image',fileInput.files[0]);
        }

        // API call
        try {
            const response = await fetch('http://localhost:8010/patientRegistration',{
                method:'post',
                body:formData
            });
            if(response.ok){
                alert("Successfully Registered");
            }
        } catch (error) {
            alert('Error occur');
            console.error(error);
        }
    };

    return (
        <>
            <div style={backgroundStyle}></div>
            <div className="container w-50 mt-5 p-2 d-flex justify-content-center">

                <div className='p-4 w-75 shadow-lg p-3 mb-5 rounded' style={{ background: 'rgba(0,0,0,0)' }} action="">
                    <h1 className='pb-1'>Registration</h1>
                    <p className='fs-6' style={{ fontFamily: 'serif' }}>Fill in the below data</p>
                    <form onSubmit={handleSubmit} action="/patientRegistration" method='post' encType='multipart/form-data'>
                        <input style={{ background: 'rgba(0,0,0,0)' }} type="text" className='form-control m-2 mx-auto border-bottom border-1 border-dark' placeholder='Full Name ' name='name' value={patData.name} onChange={onChangeHandler} />
                        <input style={{ background: 'rgba(0,0,0,0)' }} type="email" className='form-control m-2 mx-auto border-bottom border-1 border-dark' placeholder='E-mail address ' name='email' value={patData.email} onChange={onChangeHandler} />
                        <input style={{ background: 'rgba(0,0,0,0)' }} type="number" maxLength="12" title="Ten digits code" required className='form-control m-2 mx-auto border-bottom border-1 border-dark' placeholder='Mobile ' name='mobile' value={patData.mobile} onChange={onChangeHandler} />
                        <input style={{ background: 'rgba(0,0,0,0)' }} type="password" className='form-control m-2 mx-auto border-bottom border-1 border-dark' placeholder='Password ' name='password' value={patData.password} onChange={onChangeHandler} />
                        <input style={{ background: 'rgba(0,0,0,0)' }} type="password" className='form-control m-2 mx-auto border-bottom border-1 border-dark' placeholder='confirm password ' />

                        <div className="form-check-inline w-100">
                            <div className="input-group">
                                <input  style={{ background: 'rgba(0,0,0,0)' }} type="file" className="form-control" id="inputGroupFile02" name='image' />
                                <label className="input-group-text" htmlFor="inputGroupFile02">Upload Profile photo</label>
                            </div>
                        </div>
                        <div className='ml-2'>
                            <div className="form-check-inline">
                                <label className='form-check-label' htmlFor="">Gender:</label>
                            </div>
                            <div className="form-check form-check-inline me-1 ml-1">
                                <label className="form-check-label" htmlFor="inlineCheckbox1">Male</label>
                                <input className="form-check-input" type="radio" id="Male" value="Male" name="gender" onChange={onChangeHandler} />

                            </div>
                            <div className="form-check form-check-inline ml-1">
                                <label className="form-check-label" htmlFor="inlineCheckbox2">Female</label>
                                <input className="form-check-input" type="radio" id="Female" value="Female" name="gender" onChange={onChangeHandler} />
                            </div>
                            <div className="form-check form-check-inline ml-1">
                                <label className="form-check-label" htmlFor="inlineCheckbox3">Others</label>
                                <input className="form-check-input" type="radio" id="Others" value="Others" name="gender" onChange={onChangeHandler} />
                            </div>
                        </div>
                        <button className='btn btn-primary w-25 offset-9' type='submit'>Submit</button>

                    </form>
                </div>
            </div>
        </>
    )
}
