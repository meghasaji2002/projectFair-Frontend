import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Row ,Col} from 'react-bootstrap'
import MyProject from '../components/MyProject'
import Profile from '../components/Profile'

function Dashboard() {

  const[username,setUsername] = useState("")

useEffect(()=>{
 setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
},[])
console.log(username);
 

 
  return (

    <>
     <Header dashboard/>
     <div style={{width:'100%',backgroundColor:'white'}} className='pb-5'>
      <h2 className='pt-5  ms-3'>Welcome <span className='text-info'>{username}</span></h2>
      <Row className='container-fluid mt-5'>
        <Col md={8}>
          <MyProject/>
        </Col>
        <Col md={4}>
          <Profile/>
        </Col>
      </Row>
     </div>
      
    </>
  )
}

export default Dashboard