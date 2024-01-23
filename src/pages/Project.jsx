import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { Row,Col } from 'react-bootstrap'
import { allProjectAPI } from '../services/allAPI'
import { Link } from 'react-router-dom'
import './Project.css'

function Project() {

  const[istoken,setIstoken] =useState(false)
  
  const[allProject,setAllProject] = useState([])
 const[searchKey,setSearchKey] = useState("")
  console.log(searchKey);

const getAllProject = async()=>{



  if(sessionStorage.getItem("token")){
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    const result = await allProjectAPI(searchKey,reqHeader)
  console.log(result.data);
  if(result.status===200){
    setAllProject(result.data)
  }
  }

  
}

console.log(searchKey);

useEffect(()=>{
  getAllProject()
},[searchKey])

useEffect(()=>{
  if (sessionStorage.getItem("token")) {
    setIstoken(true)
  }
},[])

  return (
    <div>
      <Header/>

      <div  style={{padding:'40px'}} className=' d-flex align-items-center justify-content-center flex-column'>
         <h2 className='text-center' >All Projects</h2>
        <div className='d-flex align-items-center justify-content-center mt-5 '>
          <div className='search-box d-flex'> 
          <input value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} style={{border:'2px solid orange',padding:'5px'}}  className='form-control ' type="text" placeholder='search project using technologies' />
          <i class="fa-solid fa-magnifying-glass fa-rotate-90" style={{marginLeft:'-40px',color:'black',fontSize:'20px'}}></i>
          </div>
          </div>
          <Row className='mt-5  container-fluid'>
        {allProject?.length>0?
        allProject.map((item)=>(<Col sm={12 } md={6 } lg={4} className='d-flex align-items-center justify-content-center'>

          <ProjectCard projects={item}/>
        </Col>)):
     
         <div>
         { istoken?<p className='fs-3 text-danger text-center'>sorry  no such project currentl available</p>:
          
         <div className='d-flex align-items-center justify-content-center flex-column'>
            <img src="https://i.pinimg.com/originals/eb/17/d0/eb17d0925c49ef13af6e84cdfeaad079.gif" alt="login gif" height={'200px'} width={'200px'}/>
            <p className='text-danger fs-3 fw-bold'>Please <Link style={{textDecoration:'none'}} className='text-info' to={'/login'}>Login</Link> to view more projects</p>
          </div>}
       </div>
       
          }
      </Row>
      </div>

     
    </div>
  )
}

export default Project