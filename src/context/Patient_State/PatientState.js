import { useState } from "react";
import PatientContext from "./PatientContext"

const PatientState=({children})=>{

    const [patient, setpatient] = useState({name:"",image:""})


    return(
        <PatientContext.Provider value={{patient,setpatient}}>
            {children}
        </PatientContext.Provider>
    )
}

export default PatientState;