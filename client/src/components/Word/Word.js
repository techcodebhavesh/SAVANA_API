import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Particle from "../Particle";
import chatify from "../../Assets/Projects/chatify.png";

const Projects = () => {
    const [wordFile, setWordFile] = useState(null);
    const [pythondata, setPythonData] = useState(null); // Define pythondata state

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', wordFile); // Assuming videoFile is the file object

        try {
            const response = await fetch('http://localhost:5003/api/savef/word', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('Word file uploaded successfully');
        } catch (error) {
            console.error('Failed to upload word file:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch('http://localhost:5003/api/savef/deleteword', {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('Video file deleted successfully');
        } catch (error) {
            console.error('Failed to delete video file:', error);
        }
    };

    const handleProcess = async () => {
        try {
            const response = await fetch('http://localhost:5009/pythonword', {
                method: 'POST',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('Python code executed successfully');
            const pythondata = await response.json();
            setPythonData(pythondata); // Update pythondata state
            console.log('Python code output:', pythondata);

        } catch (error) {
            console.error('Failed to execute Python code:', error);
        }
    };

    return (
        <Container fluid className="project-section">
            <Particle />
            <Container>
                <h1 className="project-heading">
                    <strong className="purple">Research Paper AI Content </strong> Detector
                </h1>
                <p style={{ color: "white" }}>
                    Please upload the Word File.
                </p>

                <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
                    <Col md={4} className="project-card">
                        <Card className="project-card-view">
                            <Card.Img variant="top" src={chatify} alt="card-img" />
                            <Card.Body>
                                <Card.Title>Research Paper AI Detection</Card.Title>
                                <Card.Text style={{ textAlign: "justify" }}>
                                   
                                    </Card.Text>
                                    <Form.Group>
                                        <Form.Label>Upload a docx</Form.Label>
                                        <Form.Control
                                            type="file"
                                            accept=".docx"
                                            onChange={e => setWordFile(e.target.files[0])}
                                        />
                                    </Form.Group>
                                <Button variant="primary" type="submit" onClick={handleSubmit} style={{ marginRight: "10px" }}>
                                    Submit
                                </Button>
                                <Button variant="danger" onClick={handleDelete}>
                                    Delete
                                </Button>
                                <Button variant="success" onClick={handleProcess} style={{ marginLeft: "10px" }}>
                                    Process
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
            {pythondata && pythondata.output && <pre>{pythondata.output}</pre>}
        </Card.Text>
    </Card.Body>
</Card>
            </Container>
        </Container>
    );
}

export default Projects;
