import React , { useState }from "react";  
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

import Card from 'react-bootstrap/Card';  
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';




const Projects = () => {
  const [videoFile, setVideoFile] = useState(null);

  const handleSubmit = async (event) => {
  
    event.preventDefault();
  
    if (!videoFile) {
      console.error('No video file selected');
      alert("No video file selected");
      return;
    }
  
    const formData = new FormData();
    formData.append('video', videoFile);
  
    try {
      const response = await fetch('/api/save-video', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      console.log('Video file uploaded successfully');
    } catch (error) {
      console.error('Failed to upload video file:', error);
    }
  };
  
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          <strong className="purple">Deepfake </strong> Detector
        </h1>
        <p style={{ color: "white" }}>
          Please upload the Vedio.
        </p>
       
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
      <Col md={4} className="project-card">
        <Card className="project-card-view">
          <Card.Img variant="top" src={chatify} alt="card-img" />
          <Card.Body>
            <Card.Title>Project Title</Card.Title>
            <Card.Text style={{ textAlign: "justify" }}>
              Project Description
            </Card.Text>
            <Form.Group>
  <Form.Label>Upload a video</Form.Label>
  <Form.Control
    type="file"
    accept="video/*"
    onChange={e => setVideoFile(e.target.files[0])}
  />
</Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
       {/* {response && <div>{JSON.stringify(response)}</div>} */}
          </Card.Body>
        </Card>
      </Col>
    </Row>

    

      </Container>
    </Container>
  );
}

export default Projects;
