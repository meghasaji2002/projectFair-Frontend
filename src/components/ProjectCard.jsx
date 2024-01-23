import React from 'react'
import Card from 'react-bootstrap/Card';
import videoplayerImage from '../images/videoplayer.jpeg'
import { useState } from 'react';
import {Row,Col} from 'react-bootstrap'
import './ProjectCard.css'

import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../services/baseurl';

function ProjectCard({projects}) {
    
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div>
         <Card  onClick={handleShow} style={{ width: '18rem' }} className='mb-4 shadow'>
      <Card.Img  variant="top" src={projects?`${BASE_URL}/uploads/${projects.image}`:videoplayerImage} />
      <Card.Body className='threeProjects'>
        <Card.Title>{projects.title}</Card.Title>
     </Card.Body>
    </Card>


    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{color:'yellowgreen'}}>{projects.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className='text-center'> Description</h5>
        </Modal.Body>

        <Row style={{height:'250px',padding:'10px'}}>
            <Col md={6} >
                <img src={projects?`${BASE_URL}/uploads/${projects.image}`:videoplayerImage} alt="no image" width={'100%'} />
            </Col>
            <Col md={6}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, autem. Vitae ducimus sunt, illo accusamus, error maxime fuga facilis eos aperiam officia ratione esse veritatis reprehenderit nisi doloremque ipsam iure.</p>
                <p><span className='fw-bolder'> Technologies :</span> <span>{projects.language}</span></p>
            </Col>
        </Row>

        <div className='d-flex mb-4 mt-4 align-items-center justify-content-end me-5 pe-4'>
            <a style={{color:'gray'}} href={projects.github} target='_blank' > <i class="fa-brands fa-github fa-2x ms-5"></i></a>
            <a style={{color:'gray'}} href={projects.website} target='_blank' > <i class="fa-solid fa-link fa-2x ms-5"></i></a>
        </div>
       
      </Modal>
    </div>
  )
}

export default ProjectCard