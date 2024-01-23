import React from 'react'
import Card from 'react-bootstrap/Card';
import videoplayerImage from '../images/videoplayer.jpeg'
import { useState } from 'react';
import {Row,Col} from 'react-bootstrap'

import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../services/baseurl';

function ProjectCard({projects}) {
    
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div>
         <Card  onClick={handleShow} style={{ width: '18rem' }}>
      <Card.Img  variant="top" src={projects?`${BASE_URL}/uploads/${projects.image}`:videoplayerImage} />
      <Card.Body>
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
           description
        </Modal.Body>

        <Row style={{height:'250px',padding:'10px'}}>
            <Col md={6} >
                <img src={videoplayerImage} alt="no image" width={'100%'} />
            </Col>
            <Col md={6}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, autem. Vitae ducimus sunt, illo accusamus, error maxime fuga facilis eos aperiam officia ratione esse veritatis reprehenderit nisi doloremque ipsam iure.</p>
                <p><span className='fw-bolder'> Technologies :</span> <span>{projects.language}</span></p>
            </Col>
        </Row>

        <div className='d-flex'>
            <a style={{color:'gray'}} href=" https://meghasaji2002.github.io/video_player-frontend" target='_blank' > <i class="fa-brands fa-github fa-2x ms-5"></i></a>
            <a style={{color:'gray'}} href="https://video-player-frontend.vercel.app/" target='_blank' > <i class="fa-solid fa-link fa-2x ms-5"></i></a>
        </div>
       
      </Modal>
    </div>
  )
}

export default ProjectCard