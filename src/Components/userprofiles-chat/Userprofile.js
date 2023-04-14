import React from 'react'
import Navbar from '../Navbar/Navbar'
import './Userprofile.css';
const Userprofile = (props) => {
  let curruser =props.userdata[0];
  console.log(curruser);
  return (
    <div className='userprofile'>
       {props ?
         
        <div>
        <Navbar userdata ={curruser}/>
        <div className="section1">
          <div className='left'>
          <img src={curruser.profimage} className ='profile-img' alt=""/>
          </div>
          <div className='right'>
            <h2>{curruser.name}</h2>
            <h3>{curruser.email}</h3>
          </div>
        </div>
        <div className='userpost-head' >
          <p className='post-para'>Your Posts</p>
        </div>
        <div className='section2'></div>
        </div> 
        :
        <div>
          <Navbar/>
          <div><h2>Not Logged in !</h2></div>
        </div>
       
       }
    </div>
  )
}

export default Userprofile