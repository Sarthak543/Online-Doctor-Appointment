import React, { useState } from "react";
import DocumentContext from "./DocumentContext";

const DocumentState= ({children})=>{
    // This is to change the background according to pages
    const [bg,setbg] = useState("");

    /*
    Creating  an empty dictionary of doctor detail
    this dictionary is mapped with the registration form of docter
    */
    const [docData,setDocData] = useState({
        name:"",
        email:"",
        mobile:"",
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
        governmentID:"",
        expLetter:null,
        dp:null
    });


    const [signIn,setSignIn] = useState("")



return (
    <DocumentContext.Provider value = {{bg,setbg,docData,setDocData,signIn,setSignIn}}>
        {children}
    </DocumentContext.Provider>
)
}

export default DocumentState;
