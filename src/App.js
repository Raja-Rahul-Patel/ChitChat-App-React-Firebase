import {Routes,Route} from 'react-router-dom'
import './App.css';
import Signup from './Components/login-signup/Signup';
import Login from './Components/login-signup/Login';
import Mainpage from './Components/Mainpage/Mainpage';

import Fourzerofour from './Components/Fourzerofour';
import Userchats from './Components/userprofiles-chat/Userchats';
import Userprofile from './Components/userprofiles-chat/Userprofile';

import {useState,useEffect } from 'react';
import {collection ,getDocs , query ,where ,addDoc} from 'firebase/firestore';
import{useNavigate} from 'react-router-dom';
import{db ,auth} from './Firebaseconfig/firebaseconfig'


function App() {

  const[user,setUser]= useState('');
  const[successMsg,setSuccessMsg] = useState('');
  const[errorMsg,setErrorMsg] =useState('');
   
  function GetCurrentUser(){
    useEffect(()=>{
      auth.onAuthStateChanged(userlogged=>{
        if(userlogged){

          const getUser = async()=>{
            const q =query(collection(db,"users"),where("uid","==",userlogged.uid))
            const data = await getDocs(q);
            setUser(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
          };

          getUser();

        }
        else{
          setUser(null);
        }
      });
    },[])
    return user
  }
   
GetCurrentUser();

console.log(user)

  return (    
    <div>
      {user ? <div>
      <Routes>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/mainpage' element={<Mainpage userdata={user}/>}></Route>
      <Route path= '/' element = {<Mainpage userdata={user}/>}/>
      <Route path= '/userchats' element={<Userchats userdata={user}/>}/>
      <Route path = '/userprofile' element ={<Userprofile userdata={user}/>}/> 
      <Route path='/*' element={<Fourzerofour/>}/>
    </Routes>
      </div>:
      <div>
      <Routes>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/*' element={<Login/>}></Route>
      </Routes>
      </div>
      }
    </div>
 
  );
}

export default App;
