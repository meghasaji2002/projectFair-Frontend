import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';
import { addAPI } from '../services/allAPI';
import { toast,ToastContainer } from 'react-toastify';
import { addProjectResponseContext } from './contexts/ContextShare';

function AddProjects() {

  
  //to hold the value of image url
  const[preview,setPreview] = useState("")

  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)

   const[inputvalue,setInputValue] = useState({
    title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    image:""
   })


    const [show, setShow] = useState(false);

//state to hold token
   const[token,setToken] = useState("")
 
    const handleClose = () => {
      setShow(false);
      handleClear()
    }
    const handleShow = () => setShow(true);

    console.log(inputvalue);

    const handleClear = ()=>{
     setInputValue({ title:"",
     language:"",
     github:"",
     website:"",
     overview:"",
     image:""})
     setPreview("")
    }

    useEffect(()=>{
      if(inputvalue.image)
      {(setPreview(URL.createObjectURL(inputvalue.image)))}
      else{setPreview("")}
    },[inputvalue.image])

    useEffect(()=>{
      if(sessionStorage.getItem("token")){
        setToken(sessionStorage.getItem("token"))
      }
      else{
        setToken("")
      }
    },[])


    console.log(preview);

    //add project details
    const handleAdd = async (e)=>{
       e.preventDefault ()
      const{title,language, github, website, overview,image} = inputvalue
    
      if(!title || !language ||!github ||!website ||!overview ||!image){
        toast.info('please fill the form completely')
      }
      else{
        //create reqBody 
           //1) create object for formData() -- since we have uploaded content
           const reqBody = new FormData()
           //2) add data to formData -- using append() method
           reqBody.append("title",title)
           reqBody.append("language",language)
           reqBody.append("github",github)
           reqBody.append("website",website)
           reqBody.append("overview",overview)
           reqBody.append("image",image)


          if(token){ 
            const reqHeader = {
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
           }

          
        //api call to add projects
        const result = await addAPI(reqBody,reqHeader)
        console.log(result);
      if(result.status===200){
        console.log(result.data);
        toast.success('Project added successfully')
        handleClose()
        //context
        setAddProjectResponse(result.data)
      }
      else{
        console.log(result.response.data);
      }
      }

      }

    }


  return (
    <>

<Button  variant="primary" onClick={handleShow}>
        Add Project
      </Button>

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
                    <input id='image' style={{display:'none'}} type="file"  onChange={(e)=>setInputValue({...inputvalue,image:e.target.files[0]})}/>
                    <img width={'100%'} src={preview?preview:"https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX60212294.jpg" }alt=""  />
                </label>
            </Col>
            <Col md={6} className='d-flex align-items-center justify-content-center flex-column'>
                 <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Project Title ' value={inputvalue.title} onChange={(e)=>setInputValue({...inputvalue,title:e.target.value})} />
                 </div>

                 <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Project Language ' value={inputvalue.language} onChange={(e)=>setInputValue({...inputvalue,language:e.target.value})} />
                 </div>

                 <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Project github link' value={inputvalue.github} onChange={(e)=>setInputValue({...inputvalue,github:e.target.value})} />
                 </div>

                 <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Project website link ' value={inputvalue.website} onChange={(e)=>setInputValue({...inputvalue,website:e.target.value})} />
                 </div>

                 <div className='mb-3 w-100'>
                    <input type="text" className='form-control' placeholder='Project overview 'value={inputvalue.overview} onChange={(e)=>setInputValue({...inputvalue,overview:e.target.value})} />
                 </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button  style={{backgroundColor:'pink'}} onClick={handleClear}>
            Cancel
          </Button>
          <Button className='btn-info' onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer autoClose={2000} theme='colored' position='top-center'/>
    </>
  )
}

export default AddProjects