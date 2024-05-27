import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";


import ApiCard from "./ApiCard";
import laptopImg from "../../Assets/about.png";
import LineChart from "../charts/LineChart";


function Api() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              SAVANA API <strong className="purple"></strong>
            </h1>
            <ApiCard />

            <LineChart />
            
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
            <img src={laptopImg} alt="about" className="img-fluid" />
          </Col>
        </Row>
        {/* <h1 className="project-heading">
          Professional <strong className="purple">Skillset </strong>
        </h1> */}

        {/* <Techstack /> */}

        {/* <h1 className="project-heading">
          <strong className="purple">Tools</strong> I use
        </h1> */}
        {/* <Toolstack /> */}

        {/* <Github /> */}
      </Container>
    </Container>
  );
}

export default Api;
