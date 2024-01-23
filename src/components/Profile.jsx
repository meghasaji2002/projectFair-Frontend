import React, { useEffect } from 'react'
import Collapse from 'react-bootstrap/Collapse';
import { useState } from 'react';
import { BASE_URL } from '../services/baseurl';
import { ToastContainer, toast } from 'react-toastify';
import { editProfileAPI } from '../services/allAPI';

function Profile() {

    const [open, setOpen] = useState(false);

    const[userProfile,setUserProfile]= useState({
      username:"",
      email:"",
      password:"",
      github:"",
      linkedin:"",
      profile:""
    })

   const [isUpdate,setIsUpdate] = useState(false)

    //once an image is uploaded then that image will be stored in existingImage
    const[existingImage,setExistingImage]=useState("")

    // to hold the url of the new image
    const[preview,setPreview] = useState("")

    useEffect(()=>{
      const user = JSON.parse(sessionStorage.getItem("existingUser"))

      setUserProfile({...userProfile,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin,profile:""})

      setExistingImage(user.profile)
    },[isUpdate])

    useEffect(()=>{
       if(userProfile.profile){
        setPreview(URL.createObjectURL(userProfile.profile))
       }
       else{
        setPreview("")
       }
    },[userProfile.profile])

    const handleProfileUpdate = async()=>{
      const {username,email,password,github,linkedin,profile} = userProfile

      let reqBody = null;
      if(!github || !linkedin){
      
        toast.info('please fill the form completetly')
      }
      else{
        reqBody = new FormData()
        reqBody.append("username",username)
        reqBody.append("email",email)
        reqBody.append("password",password)
        reqBody.append("github",github)
        reqBody.append("linkedin",linkedin)
        preview?reqBody.append("profile",profile):reqBody.append("profile",existingImage)
      }
      const token = sessionStorage.getItem("token")
      
      if(reqBody){

      if(preview ){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
          }
          const result = await editProfileAPI(reqBody,reqHeader)
          console.log(result);
          if(result.status === 200){
            toast.success('profile updated successfully')
            sessionStorage.setItem("existingUser",JSON.stringify(result.data))
            setIsUpdate(true)
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
      const result = await editProfileAPI(reqBody,reqHeader)
      console.log(result);
      if(result.status === 200){
        toast.success('profile updated successfully')
        sessionStorage.setItem("existingUser",JSON.stringify(result.data))
        setIsUpdate(true)
      }
      else{
        console.log(result.response.data);
      }
      }}
    }



  return (
    <div className='card shadow p-5 '>
      <div className='d-flex justify-content-between'>
         <h4>Profile</h4>
         <button onClick={() => setOpen(!open)}><i class="fa-solid fa-download rounded"></i></button>
     </div>
     <Collapse in={open}>
         <div className='row justify-content-center'>
            <label htmlFor="profile" className='text-center'>
                <input id='profile' type="file" style={{display:'none'}}  onChange={(e)=>setUserProfile({...userProfile,profile:e.target.files[0]})}/>
                {existingImage==""?
                  <img height={'200px'}  width={'200px'} src={preview?preview:"https://static.vecteezy.com/system/resources/previews/010/882/587/original/woman-avatar-person-female-illustration-icon-character-face-portrait-woman-avatar-cartoon-girl-user-human-profile-isolated-white-adult-icon-office-headshot-employee-face-head-clipart-vector.jpg" }alt="" className='rounded-circle'  />: <img height={'200px'}  width={'200px'} src={preview?preview:`${BASE_URL}/uploads/${existingImage}` }alt="" className='rounded-circle'  />}
            </label>
            <div className='mb-3 mt-4'>
                <input type="text" className='form-control' placeholder='Github' value={userProfile.github} onChange={(e)=>setUserProfile({...userProfile,github:e.target.value})} />
            </div>
            <div className='mb-3 '>
                <input type="text" className='form-control' placeholder='Linkedin' value={userProfile.linkedin} onChange={(e)=>setUserProfile({...userProfile,linkedin:e.target.value})} />
            </div>
            <div className='mb-3 mt-3 '>
               <button onClick={handleProfileUpdate} className='btn btn-info rounded w-100'>Update</button>
            </div>
        </div>
     </Collapse>
     <ToastContainer autoclose={2000} theme='colored' position='top-center'/>
    </div>
  )
}

export default Profile