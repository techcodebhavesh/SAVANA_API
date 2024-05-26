import os
import sys
import csv
import joblib  
import logging
import nltk
import ssl
import spacy
from docx import Document
from PyPDF2 import PdfReader
from textblob import TextBlob
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report


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

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

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

# Function to check grammar using TextBlob
def check_grammar(text):
    blob = TextBlob(text)
    errors = len(blob.correct().sentences) - len(blob.sentences)
    return errors == 0

# Function to train a machine learning model
def train_model(csv_file):
    texts = []
    labels = []
    sample_count = 0  # Initialize sample count
    
    with open(csv_file, newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        next(reader)  # Skip the header row
        for row in reader:
            texts.append(preprocess_text(row[0]))  # Assuming the text is in the first column
            labels.append(int(row[1]))  # Assuming the label is in the second column
            sample_count += 1  # Increment sample count
            logger.debug("Processed %d samples.", sample_count)  # Logging statement
    
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform(texts)
    
    X_train, X_test, y_train, y_test = train_test_split(vectors, labels, test_size=0.2, random_state=42)
    
    model = LogisticRegression()
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    logger.info("Accuracy: %f", accuracy_score(y_test, y_pred))
    logger.info("Classification Report:\n%s", classification_report(y_test, y_pred))
    
    # Save the trained model and vectorizer
    joblib.dump(model, 'model.pkl')
    joblib.dump(vectorizer, 'vectorizer.pkl')
    
    return model, vectorizer, texts, labels  
# Main execution block
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python script.py <input_csv>")
        sys.exit(1)
    input_csv = sys.argv[1]
    if not os.path.isfile(input_csv):
        print(f"Error: Input CSV file '{input_csv}' does not exist.")
        sys.exit(1)
    model, vectorizer, texts, labels = train_model(input_csv)  # Get texts and labels
    expected_samples = 29000
    actual_samples = len(texts)  # Length of texts list
    if actual_samples == expected_samples:
        print("All samples processed successfully.")
    else:
        print("Warning: Number of processed samples does not match the expected count.")
