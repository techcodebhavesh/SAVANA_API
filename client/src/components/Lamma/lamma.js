import React , { useState }from "react";
import { Container, Row, Col } from "react-bootstrap";
//import ProjectCard from "D:/SAVANA_API/client/src/components/Projects/ProjectCards.js";
import Particle from "../Particle";
import Form from 'react-bootstrap/Form';
import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BsGithub } from 'react-icons/bs';
import { CgWebsite } from 'react-icons/cg';




const Lamma= ()=> {
  const [textBoxValue, setTextBoxValue] = useState('');
  
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5003/api/tolamma/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textBoxValue }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error('Failed to send text:', error);
    }
  };
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          <strong className="purple">AI Content </strong> Detector
        </h1>
        <p style={{ color: "white" }}>
          Please upload the Text.
        </p>
       
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
      <Col md={4} className="project-card">
        <Card className="project-card-view">
          <Card.Img variant="top" src={chatify} alt="card-img" />
          <Card.Body>
            <Card.Title>Project Title</Card.Title>
            <Card.Text style={{ textAlign: "justify" }}>
              Project D
            </Card.Text>
            <Form.Control
              type="text"
              placeholder="Write something here..."
              style={{ width: '300px', height: '100px' }}
              value={textBoxValue}
              onChange={e => setTextBoxValue(e.target.value)}
            />
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
       {/* {response && <div>{JSON.stringify(response)}</div>} */}
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Card>
      <Card.Body>
        <Card.Title>Report</Card.Title>
        <Card.Text style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        {response && <pre>{response}</pre>}

        </Card.Text>
      
      </Card.Body>
    </Card>


        
      </Container>
    </Container>
  );
}

export default Lamma;
