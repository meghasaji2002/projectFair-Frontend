import React, { useContext, useEffect, useState } from 'react'
import AddProjects from './AddProjects'
import { deleteProjectAPI, userProjectAPI } from '../services/allAPI'
import { addProjectResponseContext, editProjectResponseContext } from './contexts/ContextShare'
import EditProject from './EditProject'

function MyProject() {

    const[userProject,setUserProject] = useState([])

   const{editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
    const{addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)

    const getUserProject = async()=>{
        
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
          const result = await userProjectAPI(reqHeader)
        console.log(result.data);
        setUserProject(result.data)
       
    }

    useEffect(()=>{
      getUserProject()
  },[addProjectResponse,editProjectResponse])


    const handleDelete = async(id)=>{
          const token = sessionStorage.getItem("token")
          const reqHeader = {
            "Content-Type":"application/json",
           "Authorization":`Bearer ${token}`
        }
        const result = await deleteProjectAPI(id,reqHeader)
        console.log(result);
        if(result.status===200){
          getUserProject()
        }
        else{console.log(result.response.data);}

    }


    
  return (
    <div className='card shadow p-5'>
        <div  className='d-flex justify-content-between'>
            <h3 className='text-warning'>My Projects</h3>
          
           <AddProjects/>
        </div>
        <div className='mt-4'>
         { userProject?.length>0?
         userProject?.map((item)=>( <div className='border d-flex align-items-center p-2 rounded'>
         <h5>{item.title}</h5>
         <div className='ms-auto d-flex'>
          <EditProject project={item}/>
             {/* <button className='btn'><i class="fa-solid fa-pen-to-square text-info"></i></button> */}
             <a href={item.github}><i class="fa-brands fa-github text-duccess mt-2"></i></a>
             
             <button onClick={(e)=>handleDelete(item._id)} className='btn'><i class="fa-solid fa-trash text-danger"></i></button>
         </div>
     </div>)):
     <p className='text-danger fw-bold fs-4'> No Project Uploaded Yet!!</p>
          }
            
        </div>

    </div>
  )
}

export default MyProject