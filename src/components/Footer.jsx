import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <div style={{width:'100%'}} className='d-flex align-items-center flex-column pt-5 w-100 footer'>
       <div  className='footer d-flex align-items-evenly justify-content-evenly w-100 '>
        <div  style={{ width:'300px',textAlign:'center',display:'flex',flexDirection:'column'}}>
            <h4><i class="fa-brands fa-stack-overflow me-4 fs-1"></i>COMPANY NAME</h4>
         <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam, nihil pariatur eveniet perspiciatis autem nisi voluptates distinctio vel quidem eligendi aut rerum recusandae quos, modi quae iure nesciunt numquam accusantium.</p>
        </div>
        <div style={{ width:'300px',textAlign:'center',display:'flex',flexDirection:'column'}}>
            <h4>LINKS</h4>
            <Link to={'/'}  style={{textDecoration:'none',color:'black'}}>Home Page</Link>
              <Link to={'/login'}   style={{textDecoration:'none',color:'black'}}>LoginPage</Link>
              <Link to={'/register'}  style={{textDecoration:'none',color:'black'}}>Register</Link>
            


        </div>
        <div style={{width:'300px',textAlign:'center',display:'flex',flexDirection:'column'}}>
            <h4>USEFUL LINKS</h4>
            <Link to={'https://bootswatch.com/'}   style={{textDecoration:'none',color:'black'}}>React</Link>
              <Link to={'https://react-bootstrap.netlify.app/'}   style={{textDecoration:'none',color:'black'}}>React Bootstrap</Link>
              <Link to={'https://bootswatch.com/'}    style={{textDecoration:'none',color:'black'}}>Bootswatch</Link>
        </div>
        <div style={{ width:'300px',textAlign:'center'}}>
            <h4>CONTACTS</h4>
           <div style={{marginTop:'10px',display:'flex',justifyContent:'space-evenly'}}>
              <h6><i class="fa-brands fa-linkedin fs-4"></i></h6>
              <h6><i class="fa-brands fa-github fs-4"></i></h6>
              <h6><i class="fa-brands fa-twitter fs-4"></i></h6>
              <h6><i class="fa-brands fa-instagram fs-4"></i></h6>
           </div>
        </div>
       </div>
    </div>
  )
}

export default Footer