import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import styled from "styled-components";

// Styled component for code blocks
const CodeBlock = styled.pre`
  background-color: #2b2b2b;
  color: #ffffff;
  border-left: 6px solid #7dbb00;
  font-family: "Inconsolata", monospace;
  padding: 1em;
  overflow-x: auto;
  margin-bottom: 20px; /* Add margin to separate code blocks */
  white-space: pre-wrap; /* Ensures long lines wrap properly */
  text-align: left; /* Align text to the left */
`;

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hello Everyone, let's learn about <span className="purple">SAVANA API </span>
            and how to use it.
            <br />
            Welcome to our AI Content Detection API documentation. Our API offers advanced capabilities for automatically identifying and classifying various types of content with exceptional accuracy. Designed for seamless integration, it empowers businesses to enhance content management and ensure a safer online environment. This documentation serves as your guide to leveraging the power of AI for content moderation and compliance. Let's get started!
            <br />
          </p>
          <h2>Usage Examples:</h2>
          <InstructionBox title="Deepfake Detection" instruction="In the following example, we demonstrate how to use the Savana API to detect deepfake video. Make sure to the video.">
            {`
import requests

def upload_video_file(file_path):
    try:
        files = {'video': open(file_path, 'rb')}
        response = requests.post('http://localhost:5003/api/savev/save', files=files)
        
        if response.ok:
            print('Video file uploaded successfully')
        else:
            print('HTTP error! Status:', response.status_code)
            print('Error Response:', response.text)
    
    except Exception as e:
        print('Failed to upload video file:', e)

def delete_video_file():
    try:
        response = requests.delete('http://localhost:5003/api/savev/delete')
        
        if response.ok:
            print('Video file deleted successfully')
        else:
            print('HTTP error! Status:', response.status_code)
            print('Error Response:', response.text)
    
    except Exception as e:
        print('Failed to delete video file:', e)

def execute_python_code():
    try:
        response = requests.post('http://localhost:5009/python')
        
        if response.ok:
            print('Python code executed successfully')
            pythondata = response.json()
            print('Python code output:', pythondata)
            # Assuming you have a setPythonData function to update state
            # setPythonData(pythondata)
        else:
            print('HTTP error! Status:', response.status_code)
            print('Error Response:', response.text)
    
    except Exception as e:
        print('Failed to execute Python code:', e)

# Example usage:
# Replace 'file_path' with the actual path to your video file
file_path = 'path/to/your/video/file.mp4'
upload_video_file(file_path)

# Call other functions as needed
# delete_video_file()
# execute_python_code()
            `}
          </InstructionBox>



          <InstructionBox title="Content Detection" instruction="In the following example, we demonstrate how to use the Savana API to detect content. Make sure to replace 'Insert your content here' with your actual content.">
            {`
import requests
import json

def test_api(api_key, text):
    try:
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }

        payload = {
            'text': text
        }

        response = requests.post('http://localhost:5003/api/tolamma/process', headers=headers, json=payload)
        
        if response.ok:
            data = response.json()
            print("Response:", data)
        else:
            print("HTTP error! Status:", response.status_code)
            print("Error Response:", response.text)
    
    except Exception as e:
        print("Failed to send request:", e)

# Replace 'your_api_key' with your actual API key
api_key = 'your_api_key'

# Replace 'your_text_box_value' with the value from your text box
text_box_value = 'your_text_box_value'

test_api(api_key, text_box_value)
            `}
          </InstructionBox>



          <InstructionBox title="Image Detection" instruction="In the following example, we demonstrate how to use the Savana API to detect AI Image. Make sure to send the Image">
            {`
import requests

def upload_image_file(file_path):
    try:
        files = {'image': open(file_path, 'rb')}
        response = requests.post('http://localhost:5003/api/savev/img', files=files)
        
        if response.ok:
            print('Image file uploaded successfully')
        else:
            print('HTTP error! Status:', response.status_code)
            print('Error Response:', response.text)
    
    except Exception as e:
        print('Failed to upload image file:', e)

def delete_image_file():
    try:
        response = requests.delete('http://localhost:5003/api/savev/deleteimg')
        
        if response.ok:
            print('Image file deleted successfully')
        else:
            print('HTTP error! Status:', response.status_code)
            print('Error Response:', response.text)
    
    except Exception as e:
        print('Failed to delete image file:', e)

def execute_python_code():
    try:
        response = requests.post('http://localhost:5009/pythonimg')
        
        if response.ok:
            print('Python code executed successfully')
            pythondata = response.json()
            print('Python code output:', pythondata)
            # Assuming you have a setPythonData function to update state
            # setPythonData(pythondata)
        else:
            print('HTTP error! Status:', response.status_code)
            print('Error Response:', response.text)
    
    except Exception as e:
        print('Failed to execute Python code:', e)

# Example usage:
# Replace 'file_path' with the actual path to your image file
file_path = 'path/to/your/image/file.jpg'
upload_image_file(file_path)

# Call other functions as needed
# delete_image_file()
# execute_python_code()
            `}
          </InstructionBox>



          <InstructionBox title="Reasearch paper AI Detection" instruction="In the following example, we demonstrate how to use the Savana API to detect Research Paper AI Content. Make sure to send the docx.">
            {`
import requests

def upload_word_file(file_path):
    try:
        files = {'file': open(file_path, 'rb')}
        response = requests.post('http://localhost:5003/api/savef/word', files=files)
        
        if response.ok:
            print('Word file uploaded successfully')
        else:
            print('HTTP error! Status:', response.status_code)
            print('Error Response:', response.text)
    
    except Exception as e:
        print('Failed to upload word file:', e)

def delete_word_file():
    try:
        response = requests.delete('http://localhost:5003/api/savef/deleteword')
        
        if response.ok:
            print('Word file deleted successfully')
        else:
            print('HTTP error! Status:', response.status_code)
            print('Error Response:', response.text)
    
    except Exception as e:
        print('Failed to delete word file:', e)

def execute_python_code():
    try:
        response = requests.post('http://localhost:5009/pythonword')
        
        if response.ok:
            print('Python code executed successfully')
            pythondata = response.json()
            print('Python code output:', pythondata)
            # Assuming you have a setPythonData function to update state
            # setPythonData(pythondata)
        else:
            print('HTTP error! Status:', response.status_code)
            print('Error Response:', response.text)
    
    except Exception as e:
        print('Failed to execute Python code:', e)

# Example usage:
# Replace 'file_path' with the actual path to your word file
file_path = 'path/to/your/word/file.docx'
upload_word_file(file_path)

# Call other functions as needed
# delete_word_file()
# execute_python_code()
            `}
          </InstructionBox>



          <InstructionBox title="Blog AI Detection" instruction="In the following example, we demonstrate how to use the Savana API to detect Blog AI Content. Make sure to replace 'Insert your content here' with your actual link.">
            {`
import requests
import json

def test_api(api_key, url):
    try:
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }

        payload = {
            'url': url
        }

        response = requests.post('http://localhost:5003/api/togroq/process1', headers=headers, json=payload)
        
        if response.ok:
            data = response.json()
            print("Response:", data)
        else:
            print("HTTP error! Status:", response.status_code)
            print("Error Response:", response.text)
    
    except Exception as e:
        print("Failed to send request:", e)

# Replace 'your_api_key' with your actual API key
api_key = 'your_api_key'

# Replace 'your_text_box_value' with the value from your text box
text_box_value = 'your_text_box_value'

test_api(api_key, text_box_value)
            `}
          </InstructionBox>


    



          {/* Add more InstructionBoxes as needed */}
        </blockquote>
      </Card.Body>
    </Card>
  );
}

// InstructionBox component to display code examples with headings
const InstructionBox = ({ title, instruction, children }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{instruction}</p>
      <CodeBlock>
        {children}
      </CodeBlock>
    </div>
  );
};

export default AboutCard;
