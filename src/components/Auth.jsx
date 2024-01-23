import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Row,Col } from 'react-bootstrap'
import loginimage from '../images/login (2).png'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { loginAPI, registerAPI } from '../services/allAPI'
import { BASE_URL } from '../services/baseurl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthTokenContext } from './contexts/ContextShare'
import './Auth.css'


function Auth({register}) { 

  const {isAuthToken, setIsAuthToken} = useContext(isAuthTokenContext)

  //create a state to hold the value of user registration details
   const[userData,setUserData] =useState({
    username:"",
    email:"",
    password:""
   })
  const navigate = useNavigate()

  const registerForm = register?true:false

  console.log(userData);

 //function to register
 const handleRegister = async(e)=>{
    e.preventDefault()

 const {username,email,password} = userData

 if(!username || !email || !password){
  toast.error('please fill the form completely')
 }
 else{
  const result = await registerAPI(userData)
  console.log(result.data);
  if(result.status === 200){
    alert(`${result.data.username} is successfully registered`)
    setUserData({
      username:"",
      email:"",
      password:""
    })
    //navigate to login page
    navigate('/login')
  }
  else{alert(result.response.data)}

 }
 }

// function to login
const handlelogin = async(e)=>{
  e.preventDefault()

  const {email,password} = userData 

  if(!email || !password){
    alert('please fill the form completely')
  }
  else{
    //api call
    const result = await loginAPI(userData)
    console.log(result);

    if(result.status === 200){
      //alert
      toast.success('login successful')
      setIsAuthToken(true)

      //store data
      sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
      sessionStorage.setItem("token",result.data.token)
      
      //state empty
      setUserData({
        email:"",
        password:""
      })
      //navigate
      setTimeout(()=>{
        navigate('/')
      },2500)
      
    }
    else{
      alert(result.response.data)
    }
  }
}


//create a state to hold the value of 
  
  


  return (
    
        <div style={{width:'100%'}} className='d-flex align-items-center justify-content-center'>
            <div className='w-75 container mb-5 shadow mt-5'>
                <Link style={{color:'blue',textDecoration:'none'}} to={'/'}><i class="fa-solid fa-arrow-left"></i>Back to home</Link>
                <div className='card  p-5 rounded auth'  >
                   <div className=' row align-items-center'>
                    <div className='col-lg-6'>
                       <img style={{height:'350px'}} src={loginimage} alt="" width={'100%'} />
                    </div>
                    <div className='col-lg-6'>
                         <div className='d-flex align-items-center justify-content-center flex-column'>
                            <h2 className=' fw-bold'> <i class="fa-brands fa-stack-overflow"></i>Project Fair</h2>
                             <h5 className='ms-5 mt-4 '>
                                {
                                    registerForm?"Sign Up to your account":"Sign In to your account"
                                }
                             </h5>
                             <Form >
                                 { registerForm &&
                                    <Form.Group className="mb-3 "  controlId="formBasicEmail">
                                 
                                  <Form.Control type="email" placeholder="Enter Username" value={userData.username}onChange={(e)=>setUserData({...userData,username:e.target.value})}   />
                                </Form.Group>}

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                 
                                  <Form.Control type="email" placeholder="Enter email" value={userData.email}onChange={(e)=>setUserData({...userData,email:e.target.value})} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                 
                                  <Form.Control type="password" placeholder="Enter password"  value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})}/>
                                </Form.Group>
                                    
                                     {registerForm?
                                        <div className='mt-4'>
                                            <Button onClick={handleRegister}  className='btn btn-info rounded' variant="primary" type="submit">
                                            Register
                                          </Button>
                                          <p >Already a user?Click here to <Link to={'/login'} style={{color:'blue'}}>Login</Link></p>
                                        </div>:
                                        <div className='mt-4'>
                                        <Button onClick={handlelogin}  className='btn btn-info rounded'  type="submit">
                                        Login
                                      </Button>
                                      <p >New User?Click here to <Link to={'/register'} style={{color:'blue'}}>Register</Link></p>
                                    </div>

                                        }
                             </Form>
                         </div>
                    </div>
                   </div>
                </div>
            </div>
            <ToastContainer autoclose={2000} theme='colored' position='top-center'/>
        </div>
   
  )
                                      }

export default Auth