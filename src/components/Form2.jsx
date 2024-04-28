import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import documentContext from '../context/Document_State/DocumentContext';

export default function Form2() {

    const { docData, setDocData } = useContext(documentContext);

    const submitData = (e) => {
        //  backend call
        e.preventDefault();
        console.log(docData)
        console.log(typeof(docData.mobile))
    }

    const imageHandler = (e) => {
        if (e.target.name === "expFile") {
            docData.expLetter = e.target.files[0]
            console.log(e.target.files[0])
        } else {
            docData.dp = e.target.files[0]
            console.log(e.target.files[0])
        }
    }

    const onChangeHandler = (e) => {
        setDocData({ ...docData, [e.target.name]: e.target.value })
    }

    return (
        <>
            <form className='p-4 w-75 shadow-lg p-3 mb-5 rounded' style={{ background: 'rgba(0,0,0,0)' }} action="">
                <form action="">
                    <h1 className="pb-1">Experience and Specialization</h1>
                    <p>Previous Experience Details</p>
                    <hr />
                    <div className="row">
                        <div className="col-6"><input className='form-control' type="number" placeholder='Enter your experience' name='experience' value={docData.experience} onChange={onChangeHandler} /></div>
                        <div className="col-6"><input type="text" className="form-control" placeholder='Previous Organization name' name='previousOrg' value={docData.previousOrg} onChange={onChangeHandler} /></div>
                        <div className="col-8 mt-2"><input type="text" className="form-control" placeholder='Specialization' name='specialization' value={docData.specialization} onChange={onChangeHandler} /></div>
                        <div className="col-6">
                            <input class="form-control mt-2" type="file" id="formFile" name="expFile" placeholder='Upload Experience letter' onChange={imageHandler} />
                        </div>
                        <label htmlFor="formFile" class="form-label col-6 mt-3">Upload Experience Letter</label>
                    </div>
                    <p className='mt-2'>Personal Details</p>
                    <hr />
                    <div className="row">
                        <div className="col-4"><input type="text" className="form-control" placeholder='Country' name='country' value={docData.country} onChange={onChangeHandler} /></div>
                        <div className="col-4"><input type="text" className="form-control" placeholder='State' name='state' value={docData.state} onChange={onChangeHandler} /></div>
                        <div className="col-4"><input type="text" className="form-control" placeholder='City' name='city' value={docData.city} onChange={onChangeHandler} /></div>
                        <div className="col-4 mt-2"><input type="number" className="form-control" placeholder='zip code' name='zipCode' value={docData.zipCode} onChange={onChangeHandler} /></div>
                        <div className="col-4 mt-2"><input type="text" className="form-control" placeholder='Nationality' name='nationality'  value={docData.nationality} onChange={onChangeHandler} /></div>
                        <div className="col-4 mt-2"><input type="text" className="form-control" placeholder='Government ID (Any)' name='governmentID' value={docData.governmentID} onChange={onChangeHandler} /></div>
                        <div className="col-6">
                            <input class="form-control mt-2" type="file"  name="dp" id="formFile" placeholder='Upload Experience letter' onChange={imageHandler} />
                        </div>
                        <label htmlFor="formFile" class="form-label col-6 mt-3">Profile picture</label>
                    </div>
                    <div className="row">
                        <div className="col-6 mt-2"><Link className='btn btn-primary' to='/DocterRegistration/form1'>Previous</Link></div>
                        <div className="col-6 mt-2"><Link className='btn btn-primary offset-7' to='/submit' onClick={submitData}>Submit</Link></div>
                    </div>
                </form>
            </form>
        </>
    )
}
