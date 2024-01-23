import React, { useEffect, useState } from 'react'
import {Row,Col} from 'react-bootstrap'
import titleImage from '../images/titleimage.png'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { homeProjectAPI } from '../services/allAPI'
import './Home.css'

function Home() {

const[islogin,setIsLogin] = useState(false)
const[homeProject,setHomeProject]=useState([])

const gethomeProject = async()=>{
  const result = await homeProjectAPI()
  console.log(result.data);
  setHomeProject(result.data)
}

useEffect(()=>{
  if(sessionStorage.getItem("token")){
  setIsLogin(true)
  }
  else{
    setIsLogin(false)
  }
  
},[])

useEffect(()=>{
   gethomeProject()
},[])

console.log(islogin);

  return (
    <>
      <div style={{width:'100%'}} className='home'  >
         <div className='container-fluid rounded '>
          <Row className='align-items-center p-4 '>
            <Col sm={12} md={6} >
              <h1 style={{fontSize:'80px'}}>Project Fair</h1>
              <h5 >One stop destinetion for all software development projects</h5>
              { islogin?
                 <Link to={'/dashboard'} className='btn btn-info rounded mt-4' style={{color:'white',borderRadius:'30px'}} >Manage Projects<i class="fa-solid fa-arrow-right ms-2"></i></Link>:
                 <Link to={'/login'} className='btn btn-info mt-4 rounded getStarted' style={{borderRadius:'30px',color:'white'}} >Get Started<i class="fa-solid fa-arrow-right ms-2"></i></Link>
              }
             
            </Col>
            
            <Col sm={12} md={6} className='ps-5'>
             <img src="https://i.pinimg.com/originals/2a/53/65/2a53651a35816f499270d8275fd5318f.gif" alt="" className='w-75' style={{marginTop:'40px',height:'400px'}}/>
            </Col>
          </Row>
         </div>
      </div>

      <div style={{width:'100%',height:'500px',backgroundColor:'white'}}>
        <h2 className='text-center pt-5'>Explore Projects</h2>
         <marquee scrollAmount={10} className='mt-5'>
         
         <div className='d-flex p-5'>
          {homeProject?.length>0 ?
          homeProject.map((item)=>( <div className='ms-5 ' style={{width:'350px'}}>
          <ProjectCard projects={item}/>
        </div>)):null
           }

         
         </div>
         </marquee>
         <div className='text-center'>
          <Link to={'/project'} style={{color:'blue'}}>See More Projects</Link>
         </div>
      </div>

   
    </>
  )
}

export default Home