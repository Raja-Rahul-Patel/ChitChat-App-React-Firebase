import React from 'react'
import Navbar from '../Navbar/Navbar'
import{doc,setDoc} from "firebase/firestore";
import{storage,db} from '../../Firebaseconfig/firebaseconfig'
import {collection ,getDocs , query ,where ,addDoc} from 'firebase/firestore';
import{useNavigate} from 'react-router-dom'
import {getDownloadURL,ref ,uploadBytes } from 'firebase/storage';
import {useState} from 'react';
import{createUserWithEmailAndPassword,getAuth} from 'firebase/auth';
import './loginsignup.css';


const Signup = () => {
    const[name,setName]=useState();
    const[email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [dob,setDob]=useState();
    const [profilepic,setProfilepic]=useState();
    
    const[successMsg ,setSuccessMsg]=useState('');
    const[errorMsg ,setErrorMsg] =useState('');
    const auth=getAuth();
    const navigate=useNavigate();

     
    const handleProductImg=(e)=>{
       let selectedFile = e.target.files[0];
       if(selectedFile){
        setProfilepic(selectedFile)
       }
       else{
        setErrorMsg('please select your profile picture');
       }
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredentials)=>{
            const user = userCredentials.user;
            const storageRef = ref(storage,'profile-images/${Date.now()}');
            uploadBytes(storageRef, profilepic).then(()=>{
                getDownloadURL(storageRef).then(url=>{
                    addDoc(collection(db,'users'),{
                        
                            email,password,dob,profimage: url,name  ,uid:user.uid                  
                    })
                    .then(()=>{
                        setSuccessMsg("user added successfully");
                        setTimeout(()=>{
                            navigate('/login');
                        },500);
                    })
                    .catch((error)=>{
                        setErrorMsg(error.message);
                        setTimeout(()=>{
                          setErrorMsg('');
                        },500);
                    })
                })
            })
            .catch((error)=>{console.log(error.message)})
        })
        .catch((error)=>{
            if(error.message =='Firebase: Error (auth/invalid-email).'||
              error.message == 'Firebase : Error (auth/admin-restricted-operation).')
              {
                setErrorMsg('please fill all required firlds');
              }
              if(error.message == 'Firebase : Error (auth/email-already-in-use)'){
                setErrorMsg('User already exists');
              }
              setTimeout(()=>{
                setErrorMsg('');
              },500);
        })
    }

  return (
    <div className='wrapper'>
     <div>
       <Navbar/>
       <div className='form-outermost'>
          <h1>Signup</h1>
          <form className='form-inner'>

          {successMsg && <>
            <div className='success-msg'>{successMsg}</div>
            </>}

            {errorMsg && <>
            <div className='error-msg'>{errorMsg}</div>
            </>}
            

          <input onChange={(e)=>setName(e.target.value)} placeholder='Enter your name'type='txt'></input>

         <input onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email address'type='email'></input>

         <input onChange={(e)=>setDob(e.target.value)} placeholder='Choose Date of Birth'type='date'></input>

         <input onChange={handleProductImg} type='file' accept='image/png ,image/jpg ,image/gif,image/jpeg'     
          placeholder='Choose a Profile Picture'></input>

         <input onChange={(e)=>setPassword(e.target.value)} placeholder='Choose a password' type='password'></input>
          
          <button className="btn-submit" onClick={handleSubmit}>Submit</button>
          </form>
         
       </div>
    </div>

    </div>
   
  )
}

export default Signup