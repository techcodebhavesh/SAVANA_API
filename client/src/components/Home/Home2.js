import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
               <span className="purple"> SAVANA </span> API
            </h1>
            <p className="home-about-body">
             
Detecting deepfakes and AI-generated content has become increasingly crucial in today's digital landscape. To combat the proliferation of manipulated media, researchers have developed sophisticated deepfake detection systems augmented with AI content detectors. These systems employ a combination of machine learning algorithms and computer vision techniques to scrutinize videos and images for telltale signs of manipulation. From subtle inconsistencies in facial expressions to anomalies in audio patterns, these detectors meticulously analyze every pixel and waveform to identify any traces of synthetic content. Furthermore, they leverage vast datasets of authentic and manipulated media to continuously refine their detection capabilities, staying one step ahead of evolving manipulation techniques. By integrating deepfake detectors with AI content detectors, we can fortify our defenses against the dissemination of fabricated content, safeguarding the integrity of information in the digital age.
              <br />
              {/* <br />I am fluent in classics like
              <i>
                <b className="purple"> C++, Javascript and Go. </b>
              </i>
              <br />
              <br />
              My field of Interest's are building new &nbsp;
              <i>
                <b className="purple">Web Technologies and Products </b> and
                also in areas related to{" "}
                <b className="purple">
                  Blockchain.
                </b>
              </i>
              <br />
              <br />
              Whenever possible, I also apply my passion for developing products
              with <b className="purple">Node.js</b> and
              <i>
                <b className="purple">
                  {" "}
                  Modern Javascript Library and Frameworks
                </b>
              </i>
              &nbsp; like
              <i>
                <b className="purple"> React.js and Next.js</b>
              </i> */}
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
       
      </Container>
    </Container>
  );
}
export default Home2;
