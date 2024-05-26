import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Particle from "../Particle";
import chatify from "../../Assets/Projects/chatify.png";

const Projects = () => {
    const [videoFile, setVideoFile] = useState(null);
    const [pythondata, setPythonData] = useState(null); // Define pythondata state

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('video', videoFile); // Assuming videoFile is the file object

        try {
            const response = await fetch('http://localhost:5003/api/savev/save', {
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

    const handleDelete = async () => {
        try {
            const response = await fetch('http://localhost:5003/api/savev/delete', {
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
            const response = await fetch('http://localhost:5009/python', {
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
                    <strong className="purple">Deepfake </strong> Detector
                </h1>
                <p style={{ color: "white" }}>
                    Please upload the Video.
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
