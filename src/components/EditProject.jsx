import React,{useContext, useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col, ToastContainer } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';
import { updateProjectAPI } from '../services/allAPI';
import { editProjectResponseContext } from './contexts/ContextShare';
import { toast } from 'react-toastify';

function EditProject({project}) {

  const{editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
    const [show, setShow] = useState(false);

  
   
    const[projectDetails,setProjectDetails] = useState({
        id:project._id,
        title:project.title,
        language:project.language,
        github:project.github,
        website:project.website,
        overview:project.overview,
        image:"" 
       })

       const[preview,setPreview] = useState("")

       const handleClose = () => {setShow(false);
      handleCancel()}
       const handleShow = () => setShow(true);

       const handleCancel = ()=>{
        setProjectDetails({  id:project._id,
            title:project.title,
            language:project.language,
            github:project.github,
            website:project.website,
            overview:project.overview,
            image:"" })
        setPreview("")
       }


       const handleUpdate = async ()=>{
          const {id,title,language,github,website,overview,image} = projectDetails
          if(!title || !language ||!github ||!website ||!overview ){
            alert('please fill the form completely')
          }

          else{
            const reqBody = new FormData()
            reqBody.append("title",title)
            reqBody.append("language",language)
            reqBody.append("github",github)
            reqBody.append("website",website)
            reqBody.append("overview",overview)
           preview?reqBody.append("image",image):reqBody.append("image",project.image)


           const token = sessionStorage.getItem("token")

          if(preview){
            const reqHeader = {
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
            }
            const result = await updateProjectAPI(id,reqBody,reqHeader)
            console.log(result);

            if (result.status===200) {
              toast.success('uploaded successfully')
              handleClose()
              setEditProjectResponse(result.data)
            }
            else{
              console.log(result.response.data);
            }
          }

          else{
            const reqHeader = {
                "Content-Type":"application/json",
               "Authorization":`Bearer ${token}`
            }
            const result = await updateProjectAPI(id,reqBody,reqHeader)
            console.log(result);

            if (result.status===200) {
              toast.success('uploaded successfully')
              handleClose()
              setEditProjectResponse(result.data)
            }
            else{
              console.log(result.response.data);
            }
          }
          }
          
       }
   
     

       useEffect(()=>{
          if(projectDetails.image){
              setPreview(URL.createObjectURL(projectDetails.image))
          }
       },[projectDetails.image])

  return (
    <>
    <button onClick={handleShow} className='btn'><i class="fa-solid fa-pen-to-square text-info"></i></button>
     

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
                <label htmlFor="image" className='text-center'>
                    <input id='image' style={{display:'none'}} type="file"  onChange={(e)=>setProjectDetails({...projectDetails,image:e.target.files[0]})}/>
                    <img width={'100%'} src={preview?preview:`${BASE_URL}/uploads/${project.image}`} alt=""  />
                </label>
            </Col>
            <Col md={6} className='d-flex align-items-center justify-content-center flex-column'>
                 <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Project Title ' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} />
                 </div>

                 <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Project Language ' value={projectDetails.language} onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} />
                 </div>

                 <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Project github link' value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} />
                 </div>

                 <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Project website link ' value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} />
                 </div>

                 <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Project overview 'value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} />
                 </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCancel}  style={{backgroundColor:'pink'}} >
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="danger" >Update </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} theme='colored' position='top-center'/>
    </>
  )
}

export default EditProject