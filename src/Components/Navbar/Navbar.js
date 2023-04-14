import React from 'react'
import './Navbar.css';
import messagelogo from '../assests/mssg.jpg'
import mainlogo from '../assests/livechat.jpg'
import {Link} from 'react-router-dom'

import {useNavigate} from 'react-router-dom'
import {db,auth } from '../../Firebaseconfig/firebaseconfig'
import {signOut} from 'firebase/auth';


const Navbar = (props) => {
const navigate = useNavigate()

  const logoutuser =()=> {
       signOut(auth).then (()=>{
        setTimeout(()=>{
        navigate('/login');
    },500);
  })
  .catch((error)=>{

     console.log(error.message);
  })
  }
  let curruser = props.userdata

  return (
    <div className='navs'>
    <nav>
     <div className='left'>
      <img src={mainlogo}  className = "img1" alt=""/>
     </div>
      {curruser!= undefined ? 
      <div className='main-profile'>
      <button onClick ={logoutuser} className="logout">Logout</button>
        <Link to = '/userchat'><img src={messagelogo} className ='img2' alt=""/></Link>
        <Link to = '/userprofile'><img src={curruser.profimage} className='img2' alt = ""/></Link>  

     </div> 
      :
      <div className="right-btn">
      <Link to = '/login'><button className="login">Login</button></Link>
      <Link to = '/signup'><button className='signup'>Signup</button></Link>
      </div>
      }
      </nav> 
    
     </div>
  )
}

export default Navbar