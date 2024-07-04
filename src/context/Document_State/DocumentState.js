import React, { useState } from "react";
import DocumentContext from "./DocumentContext";

const DocumentState= ({children})=>{
    // This is to change the background according to pages
    const [bg,setbg] = useState("");

    /*
    Creating  an empty dictionary of doctor detail
    this dictionary is mapped with the registration form of docter
    */
    const [patData,setPatData] = useState({
        name:"",
        email:"",
        mobile:0,
        password:"",
        gender:""
    });
    
    const [docData,setDocData] = useState({
        name:"",
        email:"",
        mobile:0,
        password:"",
        gender:"",
        experience:"",
        specialization:"",
        previousOrg:"",
        country:"",
        state:"",
        city:"",
        zipCode:"",
        nationality:"",
        governmentId:"",
        expLetter:null,
        dp:null
    });


    const [signIn,setSignIn] = useState("")
    const [isUserLogIn, setisUserLogIn] = useState(false)



return (
    <DocumentContext.Provider value = {{bg,setbg,docData,setDocData,patData,setPatData,signIn,setSignIn,isUserLogIn, setisUserLogIn}}>
        {children}
    </DocumentContext.Provider>
)
}

export default DocumentState;
