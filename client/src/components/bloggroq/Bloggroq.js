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




const Bloggroq = ()=> {
  const [textBoxValue, setTextBoxValue] = useState('');
  
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5003/api/togroq/process1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: textBoxValue }),
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
          <strong className="purple">Blog AI Content </strong> Detector
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
              Project Description
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


          {/*

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="Bits-0f-C0de"
              description="My personal blog page build with Next.js and Tailwind Css which takes the content from makdown files and renders it using Next.js. Supports dark mode and easy to write blogs using markdown."
              ghLink="https://github.com/soumyajit4419/Bits-0f-C0de"
              demoLink="https://blogs.soumya-jit.tech/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Editor.io"
              description="Online code and markdown editor build with react.js. Online Editor which supports html, css, and js code with instant view of website. Online markdown editor for building README file which supports GFM, Custom Html tags with toolbar and instant preview.Both the editor supports auto save of work using Local Storage"
              ghLink="https://github.com/soumyajit4419/Editor.io"
              demoLink="https://editor.soumya-jit.tech/"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Plant AI"
              description="Used the plant disease dataset from Kaggle and trained a image classifer model using 'PyTorch' framework using CNN and Transfer Learning with 38 classes of various plant leaves. The model was successfully able to detect diseased and healthy leaves of 14 unique plants. I was able to achieve an accuracy of 98% by using Resnet34 pretrained model."
              ghLink="https://github.com/soumyajit4419/Plant_AI"
              demoLink="https://plant49-ai.herokuapp.com/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={suicide}
              isBlog={false}
              title="Ai For Social Good"
              description="Using 'Natural Launguage Processing' for the detection of suicide-related posts and user's suicide ideation in cyberspace  and thus helping in sucide prevention."
              ghLink="https://github.com/soumyajit4419/AI_For_Social_Good"
              // demoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" <--------Please include a demo link here
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={emotion}
              isBlog={false}
              title="Face Recognition and Emotion Detection"
              description="Trained a CNN classifier using 'FER-2013 dataset' with Keras and tensorflow backened. The classifier sucessfully predicted the various types of emotions of human. And the highest accuracy obtained with the model was 60.1%.
              Then used Open-CV to detect the face in an image and then pass the face to the classifer to predict the emotion of a person."
              ghLink="https://github.com/soumyajit4419/Face_And_Emotion_Detection"
              // demoLink="https://blogs.soumya-jit.tech/"      <--------Please include a demo link here 
            />
          </Col>
        </Row> */}
      </Container>
    </Container>
  );
}

export default Bloggroq;
