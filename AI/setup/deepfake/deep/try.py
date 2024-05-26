import os
import sys
import csv
import joblib
import nltk
import ssl
import spacy
from docx import Document
from PyPDF2 import PdfReader
from textblob import TextBlob
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer

# Setting up SSL context
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

# Load SpaCy model
nlp = spacy.load("en_core_web_sm")

# Downloading necessary NLTK data
nltk.download('punkt')
nltk.download('stopwords')

# Function to read .docx files
def read_docx(file_path):
    doc = Document(file_path)
    text = " ".join([para.text for para in doc.paragraphs])
    return text

# Function to preprocess text
def preprocess_text(text):
    tokens = word_tokenize(text.lower())
    stop_words = set(stopwords.words("english"))
    filtered_tokens = [word for word in tokens if word.isalpha() and word not in stop_words]
    return " ".join(filtered_tokens)

# Function to read .pdf files
def read_pdf(file_path):
    with open(file_path, "rb") as file:
        reader = PdfReader(file)
        text = " ".join([page.extract_text() for page in reader.pages])
    return text

# Function to vectorize text
def vectorize_text(texts, vectorizer):
    vectors = vectorizer.transform(texts)
    return vectors

# Main execution block
if __name__ == "__main__":
    # Hardcode the input file path here
    input_file = r"D:/SAVANA_API/AI/setup/deepfake/wordfile/test.docx"  # Change this to your actual file path
    
    if not os.path.isfile(input_file):
        print(f"Error: Input file '{input_file}' does not exist.")
        sys.exit(1)
    
    # Load the trained model and vectorizer
    model = joblib.load('model.pkl')
    vectorizer = joblib.load('vectorizer.pkl')
    
    # Read input file and preprocess text
    if input_file.endswith(".docx"):
        text = read_docx(input_file)
    elif input_file.endswith(".pdf"):
        text = read_pdf(input_file)
    else:
        print("Error: Unsupported file format. Only .docx and .pdf files are supported.")
        sys.exit(1)
    
    preprocessed_text = preprocess_text(text)
    vectorized_text = vectorize_text([preprocessed_text], vectorizer)
    
    # Predict using the loaded model
    prediction = model.predict(vectorized_text)
    probabilities = model.predict_proba(vectorized_text)
    ai_probability = probabilities[0][1]
    
    # Print confidence scores
    print("AI Probability:", ai_probability)
    print("Human Probability:", 1 - ai_probability)
    
    # Print percentage of text that is AI-generated
    print("Percentage of the text that is AI-generated:", ai_probability * 100, "%")
    
    # Find and print reference to AI content
    ai_reference = "AI content not found in the input file."
    if prediction == 1:
        sentences = TextBlob(text).sentences
        for sentence in sentences:
            if "AI" in sentence or "artificial intelligence" in sentence:
                ai_reference = str(sentence)
                break

    print(ai_reference)
