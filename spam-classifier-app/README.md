# Email Spam Classifier Web App

A machine learning web application that classifies emails as spam or legitimate using a Naive Bayes classifier.

## Project Structure
```
spam-classifier-app/
├── frontend/          # React web interface
├── backend/           # Flask API server
│   ├── models/        # Trained ML models
│   ├── app.py         # Flask application
│   └── requirements.txt
└── README.md
```

## Features
- Real-time email classification
- Confidence scores for predictions
- Clean, user-friendly web interface
- Trained on real spam/ham dataset
- Custom preprocessing pipeline

## Technology Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Flask, Python
- **Machine Learning:** scikit-learn, NLTK
- **Model:** Multinomial Naive Bayes with TF-IDF vectorization

## Installation & Setup

### Prerequisites
- Python 3.12+
- Node.js and npm
- Git

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
```

### Frontend Setup
```bash
cd frontend
npm install
```

## Running the Application

**You need 2 terminals running simultaneously:**

### Terminal 1 - Start Backend (Flask API)
```bash
cd backend
python app.py
```
*Keep this running - you should see "Model and vectorizer loaded successfully!"*

### Terminal 2 - Start Frontend (React App)
```bash
cd frontend
npm start
```
*This will automatically open your browser to the web app*

## Usage
1. Open your browser to `http://localhost:3000` (or the port shown)
2. Paste email content into the text area
3. Click "Classify Email"
4. View the classification result and confidence score

## API Endpoints
- `GET /api/health` - Check if the model is loaded
- `POST /api/classify` - Classify email text
  ```json
  {
    "email_text": "Your email content here"
  }
  ```

## Model Details
- **Algorithm:** Multinomial Naive Bayes
- **Vectorization:** Count Vectorizer with custom preprocessing
- **Preprocessing:** Remove punctuation, remove stopwords
- **Features:** Bag of words representation

## Troubleshooting

### "Failed to classify email"
- Make sure both backend and frontend are running
- Check that Flask shows "Model and vectorizer loaded successfully!"
- Test the API directly: `curl http://localhost:5000/api/health`

### Proxy errors
- Ensure Flask is running on port 5000
- Try refreshing the browser page

### Model loading errors
- Verify that model files exist in `backend/models/`
- Check that all required packages are installed

## Development Notes
- The model was trained using scikit-learn 1.5.1 but runs on 1.7.1 (version warnings are normal)
- Custom `message_cleaning` function handles text preprocessing
- React app uses absolute URLs to communicate with Flask API


## Clone your repo
git clone https://github.com/RahmaAmmari/Spam-Email-Classifier.git
cd Spam-Email-Classifier

# Set up virtual environment
python -m venv .venv
source .venv/Scripts/activate  # Windows
# or source .venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Run the app
cd spam-classifier-app/backend
python app.py