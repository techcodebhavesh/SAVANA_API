import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hello Everyone, lets learn about <span className="purple">SAVANA API </span>
            and how to use it 
            <br />
           
Detecting deepfakes and AI-generated content has become increasingly crucial in today's digital landscape. To combat the proliferation of manipulated media, researchers have developed sophisticated deepfake detection systems augmented with AI content detectors. These systems employ a combination of machine learning algorithms and computer vision techniques to scrutinize videos and images for telltale signs of manipulation. From subtle inconsistencies in facial expressions to anomalies in audio patterns, these detectors meticulously analyze every pixel and waveform to identify any traces of synthetic content. Furthermore, they leverage vast datasets of authentic and manipulated media to continuously refine their detection capabilities, staying one step ahead of evolving manipulation techniques. By integrating deepfake detectors with AI content detectors, we can fortify our defenses against the dissemination of fabricated content, safeguarding the integrity of information in the digital age.
          
            <br />
           
          </p>
         
        
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
