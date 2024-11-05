from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle

# Initialize Flask and enable CORS
app = Flask(__name__)
CORS(app)  # This will allow your React frontend to communicate with Flask

# Load the model, tokenizer, and label encoder
model = tf.keras.models.load_model('emotion_model.keras')
with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)
with open('label_encoder.pickle', 'rb') as handle:
    encoder = pickle.load(handle)

# Preprocessing function for the input text
def preprocess_text(text):
    # Tokenize and pad the text
    sequence = tokenizer.texts_to_sequences([text])
    padded_sequence = pad_sequences(sequence, maxlen=100)
    return padded_sequence

# Define the prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    # Get the input data from the request
    data = request.json
    text = data['text']
    
    # Preprocess and predict
    processed_text = preprocess_text(text)
    prediction = model.predict(processed_text)[0]
    
    # Prepare the result as a dictionary of emotions with their corresponding percentages
    emotion_percentages = {encoder.classes_[i]: float(prediction[i]) * 100 for i in range(len(prediction))}
    return jsonify(emotion_percentages)

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
