from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
from pydantic import BaseModel

app = FastAPI(
    title="CareMind Disease Prediction API",
    version="2.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "CareMind AI API is running 🚀",
        "docs": "/docs",
        "endpoint": "/predict"
    }

print("Loading models...")

rf_model = joblib.load("rf_model.pkl")
xgb_model = joblib.load("xgb_model.pkl")
label_encoder = joblib.load("label_encoder.pkl")
symptom_columns = joblib.load("symptom_columns.pkl")

print("Models loaded successfully")

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


# Related disease suggestions
related_diseases = {

"pneumonia":[
"Bronchitis",
"Tuberculosis",
"Severe Respiratory Infection"
],

"bronchitis":[
"Pneumonia",
"Influenza",
"Respiratory Infection"
],

"influenza":[
"Common Cold",
"Bronchitis",
"Viral Fever"
],

"common cold":[
"Influenza",
"Sinus Infection",
"Allergic Rhinitis"
],

"dengue":[
"Malaria",
"Chikungunya",
"Viral Fever"
],

"malaria":[
"Dengue",
"Typhoid",
"Viral Fever"
],

"noninfectious gastroenteritis":[
"Food Poisoning",
"Stomach Infection",
"Viral Gastroenteritis"
],

"food poisoning":[
"Gastroenteritis",
"Stomach Infection",
"Bacterial Infection"
],

"migraine":[
"Tension Headache",
"Sinusitis",
"Cluster Headache"
],

"sinusitis":[
"Common Cold",
"Migraine",
"Respiratory Infection"
]

}


@app.post("/predict")
def predict(data: SymptomInput):

    user_symptoms = [s.lower().strip() for s in data.symptoms]

    symptom_vector = [0] * len(symptom_columns)

    for symptom in user_symptoms:

        if symptom in symptom_columns:

            index = symptom_columns.index(symptom)
            symptom_vector[index] = 1

    input_array = np.array(symptom_vector).reshape(1,-1)

    rf_probs = rf_model.predict_proba(input_array)
    xgb_probs = xgb_model.predict_proba(input_array)

    ensemble_probs = 0.6*xgb_probs + 0.4*rf_probs

    predicted_class = np.argmax(ensemble_probs)

    confidence = float(np.max(ensemble_probs))

    disease = label_encoder.inverse_transform([predicted_class])[0]

    decision = referral_logic(confidence)

    possible = related_diseases.get(
    disease.lower(),
    ["General Viral Infection","Bacterial Infection","Respiratory Illness"]
)
    return {
        "predicted_disease": disease,
        "confidence_score": confidence,
        "referral_decision": decision,
        "possible_diseases": possible
    }