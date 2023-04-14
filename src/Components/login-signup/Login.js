import React from 'react'
import Navbar from '../Navbar/Navbar'
import{useNavigate} from 'react-router-dom'
import{getAuth , signInWithEmailAndPassword} from 'firebase/auth';
import './loginsignup.css'
import {useState} from 'react';

const Login = () => {
    const[name,setName]=useState();
    const[email,setEmail]=useState();
    const [password,setPassword]=useState();
    
    const[successMsg ,setSuccessMsg]=useState('');
    const[errorMsg ,setErrorMsg] =useState('');
    const auth=getAuth();
    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredentials)=>{
            const user = userCredentials.user;
         
            setSuccessMsg("Logged in successfully");
            setTimeout(()=>{
                         navigate('/Mainpage');
                        },1000);
                    })
                    
          
    
        .catch((error)=>{
         const errorCode=error.code;
         const errorMessage = error.message;
            console.log(error.message)
            if(errorMessage =='Firebase: Error (auth/wrong-password).'){
                setErrorMsg('wrong Passwword')
            }
            if(errorMessage == 'Firebase : Error (auth/invalid-email).'){
                setErrorMsg('Invalid-Mail');
              }

            if(errorMessage=='Firebase:Error (authe/user-not-found).'){
                setErrorMsg('User not registered , Please SignUp First')
            }
            if(errorMessage=='Firebase:Error (auth/missing-email).'||errorMessage=="Firebase:Error (auth/internal-error)."){
              setErrorMsg("Field can't be empty")
            }
              setTimeout(()=>{
                setErrorMsg('');
              },1000);
        })
    }

  return (

    <div className='wrapper'>
    <div>
      <Navbar/>
      <div className='form-outermost'>
         <h1>Login</h1>
         <form className='form-inner'>

         {successMsg && <>
           <div className='success-msg'>{successMsg}</div>
           </>}

           {errorMsg && <>
           <div className='error-msg'>{errorMsg}</div>
           </>}
    

        <input onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email address'type='email'></input>

        <input onChange={(e)=>setPassword(e.target.value)} placeholder='Choose a password' type='password'></input>
         
         <button className="btn-submit" onClick={handleSubmit}>Submit</button>
         </form>
        
      </div>
   </div>

   </div>
  )
}

export default Login