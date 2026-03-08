from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
from pydantic import BaseModel

# Create FastAPI app
app = FastAPI(
    title="CareMind Disease Prediction API",
    description="AI-based disease prediction system using RandomForest and XGBoost",
    version="1.0"
)

# Enable CORS (allows frontend to call the API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root route (prevents 404 on homepage)
@app.get("/")
def home():
    return {
        "message": "CareMind AI API is running 🚀",
        "docs": "/docs",
        "endpoint": "/predict"
    }

# Load models
rf_model = joblib.load("rf_model.pkl")
xgb_model = joblib.load("xgb_model.pkl")
label_encoder = joblib.load("label_encoder.pkl")
symptom_columns = joblib.load("symptom_columns.pkl")

# Input schema
class SymptomInput(BaseModel):
    symptoms: list

# Referral logic
def referral_logic(conf):
    if conf > 0.85:
        return "Direct Treatment"
    elif conf > 0.60:
        return "General Physician Review"
    elif conf > 0.40:
        return "Urgent Specialist Referral"
    else:
        return "Emergency Referral"

# Prediction API
@app.post("/predict")
def predict(data: SymptomInput):

    user_symptoms = data.symptoms

    # Create empty symptom vector
    symptom_vector = [0] * len(symptom_columns)

    for symptom in user_symptoms:
        if symptom in symptom_columns:
            index = symptom_columns.index(symptom)
            symptom_vector[index] = 1

    input_array = np.array(symptom_vector).reshape(1, -1)

    rf_probs = rf_model.predict_proba(input_array)
    xgb_probs = xgb_model.predict_proba(input_array)

    # Ensemble prediction
    ensemble_probs = 0.6 * xgb_probs + 0.4 * rf_probs

    predicted_class = np.argmax(ensemble_probs)
    confidence = np.max(ensemble_probs)

    disease = label_encoder.inverse_transform([predicted_class])[0]

    decision = referral_logic(confidence)

    return {
        "predicted_disease": disease,
        "confidence_score": float(confidence),
        "referral_decision": decision
    }