import os
import sys
import docx
import PyPDF2
import nltk
import ssl
import spacy
from textblob import TextBlob
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.tag import pos_tag
from collections import Counter
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import numpy as np

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
nltk.download('averaged_perceptron_tagger')

# Function to read .docx files
def read_docx(file_path):
    doc = docx.Document(file_path)
    text = " ".join([para.text for para in doc.paragraphs])
    return text

# Function to read .pdf files
def read_pdf(file_path):
    with open(file_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        text = " ".join([page.extract_text() for page in reader.pages])
    return text

# Function to preprocess text
def preprocess_text(text):
    tokens = word_tokenize(text.lower())
    stop_words = set(stopwords.words("english"))
    filtered_tokens = [word for word in tokens if word.isalpha() and word not in stop_words]
    return filtered_tokens

# Function to extract linguistic features
def extract_features(text):
    tokens = preprocess_text(text)
    doc = nlp(text)
    
    # Extract adjectives
    adjectives = [token.text for token in doc if token.pos_ == "ADJ"]

    # Extract named entities
    entities = [ent.label_ for ent in doc.ents]
    
    # Dependency parsing features
    dependencies = [token.dep_ for token in doc]

    # POS tags
    pos_tags = [token.tag_ for token in doc]

    return adjectives, entities, dependencies, pos_tags

# Function to vectorize text
def vectorize_text(texts):
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform(texts)
    return vectors, vectorizer

# Function to check grammar using TextBlob
def check_grammar(text):
    blob = TextBlob(text)
    errors = len(blob.correct().sentences) - len(blob.sentences)
    return errors == 0

# Function to train a machine learning model
def train_model(human_texts, ai_texts):
    labels = [0] * len(human_texts) + [1] * len(ai_texts)
    texts = human_texts + ai_texts

    vectors, vectorizer = vectorize_text(texts)
    X_train, X_test, y_train, y_test = train_test_split(vectors, labels, test_size=0.2, random_state=42)

    model = LogisticRegression()
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    print("Accuracy:", accuracy_score(y_test, y_pred))
    print("Classification Report:\n", classification_report(y_test, y_pred))

    return model, vectorizer

# Main execution block
if __name__ == "__main__":
    if len(sys.argv) < 5:
        print("Usage: python script.py <input_file> <ai_wordlist> <human_text> <ai_text>")
        sys.exit(1)

    input_file = sys.argv[1]
    ai_wordlist = sys.argv[2]
    human_text_file = sys.argv[3]
    ai_text_file = sys.argv[4]

    if not os.path.isfile(input_file):
        print(f"Error: Input file '{input_file}' does not exist.")
        sys.exit(1)

    if not os.path.isfile(ai_wordlist):
        print(f"Error: AI wordlist file '{ai_wordlist}' does not exist.")
        sys.exit(1)

    if not os.path.isfile(human_text_file):
        print(f"Error: Human text file '{human_text_file}' does not exist.")
        sys.exit(1)

    if not os.path.isfile(ai_text_file):
        print(f"Error: AI text file '{ai_text_file}' does not exist.")
        sys.exit(1)

    if input_file.endswith(".docx"):
        text = read_docx(input_file)
    elif input_file.endswith(".pdf"):
        text = read_pdf(input_file)
    else:
        print("Error: Unsupported file format. Only .docx and .pdf files are supported.")
        sys.exit(1)

    human_text = read_docx(human_text_file) if human_text_file.endswith(".docx") else read_pdf(human_text_file)
    ai_text = read_docx(ai_text_file) if ai_text_file.endswith(".docx") else read_pdf(ai_text_file)

    # Train model
    human_texts = [human_text]  # Ideally, you would have a dataset of human-written texts
    ai_texts = [ai_text]  # Ideally, you would have a dataset of AI-generated texts
    model, vectorizer = train_model(human_texts, ai_texts)

    # Analyze input text
    vector = vectorizer.transform([text])
    ai_probability = model.predict_proba(vector)[0][1]
    grammar_correct = check_grammar(text)

    # Extract features for additional analysis
    adjectives, entities, dependencies, pos_tags = extract_features(text)
    
    # Display results
    print("AI Probability:", ai_probability)
    print("Grammar Correct:", grammar_correct)
    print("Adjectives:", adjectives)
    print("Entities:", entities)
    print("Dependencies:", dependencies)
    print("POS Tags:", pos_tags)
