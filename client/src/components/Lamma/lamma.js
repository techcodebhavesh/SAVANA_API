import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Form from 'react-bootstrap/Form';
import chatify from "../../Assets/Projects/chatify.png";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Lamma = () => {
  const [textBoxValue, setTextBoxValue] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false); // Define loading state

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true when process starts
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
    } finally {
      setLoading(false); // Set loading to false when process ends
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
                <Card.Title>AI Text Detection</Card.Title>
                <Card.Text style={{ textAlign: "justify" }}>
                  Please enter the text you want to analyze.
                </Card.Text>
                <Form.Control
                  type="text"
                  placeholder="Write something here..."
                  style={{ width: '300px', height: '100px' }}
                  value={textBoxValue}
                  onChange={e => setTextBoxValue(e.target.value)}
                />
                <Button variant="primary" type="submit" onClick={handleSubmit} style={{ marginTop: '10px' }}>
                  Submit
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card>
          <Card.Body>
            <Card.Title>Report</Card.Title>
            <Card.Text style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              {loading ? (
                <div>Loading...</div>
              ) : (
                response && <pre>{JSON.stringify(response, null, 2)}</pre>
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
}

export default Lamma;
