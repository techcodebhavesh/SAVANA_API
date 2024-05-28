# SAVANA_API
SAVANA: Secure AI Verification And Non-deceptive Analysis

SAVANA API, encompassing four key features: image deepfake detection, video deepfake detection, AI content detection in research papers, and AI content detection in blogs. Utilizing advanced machine learning models and natural language processing techniques, our system ensures reliable and accurate identification of AI-generated content, thus enhancing the integrity and trustworthiness of digital media. The proposed methodology includes the use of BlazeFace for face detection, EfficientNetB4 for regression tasks, fine-tuned vectorizers with logistic regression for text analysis, and LLaMA 3 for nuanced linguistic pattern detection. This study outlines the technical aspects and experimental results of each feature, demonstrating the efficacy of our approach in combating deceptive AI content.


## Abstract
This project presents the design and implementation of a comprehensive system for secure AI verification and non-deceptive analysis. Our system encompasses four key features:
1. Image Deepfake Detection
2. Video Deepfake Detection
3. AI Content Detection
4. AI Content Detection in Research Papers
5. AI Content Detection in Blogs
-This README outlines the technical aspects and provides an overview of the experimental results for each feature, demonstrating the efficacy of our approach in combating deceptive AI content.

## Features

### 1. Image Deepfake Detection
Detects manipulated images using BlazeFace for face detection and EfficientNetB4 for the regression tasks.

### 2. Video Deepfake Detection
Analyzes videos to identify deepfake content by leveraging advanced machine learning techniques.

### 3. AI Content Detection in Research Papers
Employs fine-tuned vectorizers and logistic regression to detect AI-generated content in academic research papers.

### 4. AI Content Detection in Blogs
Uses LLaMA 3 to analyze and identify AI-generated content in blogs, ensuring the authenticity of the text.


## Requirements
- tensorflow
- keras
- numpy
- opencv-python
- blazeface
- efficientnet

text detection libraries:
- os
- sys
- csv
- joblib
- logging
- nltk
- ssl
- spacy
- python-docx
- PyPDF2
- textblob
- scikit-learn



## Downloads

- *BlazeFace Model*: [BlazeFace GitHub](https://github.com/hollance/BlazeFace)
- *EfficientNetB4 Weights*: [TensorFlow Hub](https://tfhub.dev/tensorflow/efficientnet/b4/classification/1)
- *DFDC Dataset*: [Kaggle](https://www.kaggle.com/c/deepfake-detection-challenge/data)

(in text detection  code)
-  import nltk
    nltk.download('punkt')
    nltk.download('stopwords')



### model.pkl
This file contains the trained logistic regression model saved using joblib.

### vectorizer.pkl
This file contains the TF-IDF vectorizer used to transform the text data, saved using joblib.



## Usage

### Detect Deepfakes in Images

bash
python detect_deepfake.py --input image --path /path/to/image.jpg


### Detect Deepfakes in Videos

bash
python detect_deepfake.py --input video --path /path/to/video.mp4

## Training

To train the EfficientNetB4 model:

bash
python train_model.py --data /path/to/dfdc_dataset



## Installation Steps

1. **Clone the Repository:**
   ```
   git clone https://github.com/techcodebhavesh/SAVANA_API.git
   ```

2. **Navigate to Project Directory:**
   ```
   cd SAVANA_API
   ```
   

3. **Install Dependencies:**
    - To ensure all dependencies are installed correctly, navigate to the project's client and root directory and run the following command:
   ```
   npm install
   ```
4. **Fix for Legacy Peer Dependencies:**
    - If you encounter any issues related to legacy peer dependencies during the installation process, use the following command to install them:
   ```
   npm i --legacy-peer-deps
   ```

5. **Build the Project:**
   ```
   npm run build
   ```

6. **Download and Set up the Llama3 model on the Linux server:**
   -run the server code
    ```
   node ser.js
   ```

7. **Start the Python Server:**
   - Within the project's respective directory(/AI/setup/deepfake/deep), execute the command:
   ```
   python runpython.py
   ```
8. **Start the Application:**
   - Within the project's main directory, execute the command:
   ```
   npm run start
   ```





