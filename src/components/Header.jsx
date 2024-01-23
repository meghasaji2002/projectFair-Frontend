import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthTokenContext } from './contexts/ContextShare';
import './Header.css'

function Header({dashboard}) {
   
const {isAuthToken, setIsAuthToken} = useContext(isAuthTokenContext)

const navigate = useNavigate()

const handleLogout = ()=>{
  sessionStorage.removeItem("token")
  sessionStorage.removeItem("existingUser")
  setIsAuthToken(false)
  //navigate to home
  navigate('/')
}

  return (
    <div> 
      <Navbar className='nav'>
    <Container>
      <Navbar.Brand href="#home">
        <Link to={'/'} style={{textDecoration:'none',color:'black',fontSize:'28px'}} >
        <i class="fa-brands fa-stack-overflow"></i> {' '}
        Project Fair
        </Link>
     
      </Navbar.Brand>
      {
        dashboard&&
        <button onClick={handleLogout} className='btn btn-info'>Logout<i class="fa-solid fa-power-off ms-2"></i></button>
      }
    </Container>
  </Navbar>
  </div>
  )
}

export default Header