from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import numpy as np
import string
import nltk
from nltk.corpus import stopwords

# Download required NLTK data
try:
    nltk.download('stopwords', quiet=True)
except:
    pass

app = Flask(__name__)
CORS(app)

# Define your message cleaning function
def message_cleaning(message):
    Test_punc_removed = [char for char in message if char not in string.punctuation]
    Test_punc_removed_join = ''.join(Test_punc_removed)
    Test_punc_removed_join_clean = [word for word in Test_punc_removed_join.split() if word.lower() not in stopwords.words('english')]
    return Test_punc_removed_join_clean

# Load model and vectorizer
try:
    model = joblib.load('models/spam_classifier_model.pkl')
    vectorizer = joblib.load('models/vectorizer.pkl')
    print("Model and vectorizer loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None
    vectorizer = None

@app.route('/api/classify', methods=['POST'])
def classify_email():
    try:
        if model is None or vectorizer is None:
            return jsonify({'error': 'Model not loaded'}), 500
        
        data = request.json
        email_text = data.get('email_text', '')
        
        if not email_text:
            return jsonify({'error': 'No email text provided'}), 400
        
        # Vectorize the email text using the same preprocessing
        email_vector = vectorizer.transform([email_text])
        
        # Make prediction
        prediction = model.predict(email_vector)[0]
        probabilities = model.predict_proba(email_vector)[0]
        confidence = float(np.max(probabilities))
        
        return jsonify({
            'is_spam': bool(prediction),
            'confidence': confidence,
            'probabilities': {
                'ham': float(probabilities[0]),
                'spam': float(probabilities[1])
            }
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'model_loaded': model is not None})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)