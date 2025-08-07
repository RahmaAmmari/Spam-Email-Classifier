import React, { useState } from 'react';
import { Mail, Shield, AlertTriangle, CheckCircle, Loader } from 'lucide-react';

function App() {
  const [emailText, setEmailText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confidence, setConfidence] = useState(null);
  const [error, setError] = useState(null);

const classifyEmail = async (text) => {
  const response = await fetch('http://localhost:5000/api/classify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email_text: text })
  });
  
  if (!response.ok) {
    throw new Error('Classification failed');
  }
  
  return await response.json();
};

  const handleSubmit = async () => {
    if (!emailText.trim()) return;
    
    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      const prediction = await classifyEmail(emailText);
      setResult(prediction.is_spam ? 'spam' : 'ham');
      setConfidence(prediction.confidence);
    } catch (error) {
      console.error('Classification error:', error);
      setError('Failed to classify email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setEmailText('');
    setResult(null);
    setConfidence(null);
    setError(null);
  };

  const getResultColor = () => {
    if (result === 'spam') return 'text-red-600 bg-red-50 border-red-200';
    if (result === 'ham') return 'text-green-600 bg-green-50 border-green-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getResultIcon = () => {
    if (result === 'spam') return <AlertTriangle className="w-6 h-6" />;
    if (result === 'ham') return <CheckCircle className="w-6 h-6" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Email Spam Classifier</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Paste your email content below to check if it's spam or legitimate
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            {/* Email Input */}
            <div>
              <div className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Content
              </div>
              <textarea
                value={emailText}
                onChange={(e) => setEmailText(e.target.value)}
                placeholder="Paste the email content here..."
                className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                disabled={loading}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                disabled={!emailText.trim() || loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Classify Email'
                )}
              </button>
              
              <button
                onClick={handleClear}
                disabled={loading}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className={`mt-8 p-6 rounded-lg border-2 ${getResultColor()}`}>
              <div className="flex items-center mb-3">
                {getResultIcon()}
                <h3 className="text-xl font-semibold ml-3">
                  Classification Result
                </h3>
              </div>
              
              <div className="space-y-2">
                <p className="text-lg">
                  This email is classified as: 
                  <span className="font-bold ml-2">
                    {result === 'spam' ? 'SPAM' : 'LEGITIMATE'}
                  </span>
                </p>
                
                {confidence && (
                  <p className="text-sm opacity-80">
                    Confidence: {(confidence * 100).toFixed(1)}%
                  </p>
                )}
                
                {result === 'spam' && (
                  <p className="text-sm mt-2">
                    ⚠️ This email appears to be spam. Be cautious of links, attachments, or requests for personal information.
                  </p>
                )}
                
                {result === 'ham' && (
                  <p className="text-sm mt-2">
                    ✅ This email appears to be legitimate, but always verify sender identity for sensitive requests.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Always exercise caution with suspicious emails regardless of classification results.</p>
        </div>
      </div>
    </div>
  );
}

export default App;