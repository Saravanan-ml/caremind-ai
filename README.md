CareMind AI – Disease Prediction System 🧠🏥
Overview

CareMind AI is a machine learning–based disease prediction system that predicts possible diseases based on user-entered symptoms.
The system uses an ensemble machine learning model (Random Forest + XGBoost) and provides a confidence score and medical referral recommendation.

This project demonstrates the integration of Machine Learning, FastAPI backend, and Web Frontend for a healthcare-support application.

Features

Predict diseases based on symptoms

Ensemble Machine Learning Model

Confidence score for predictions

Referral recommendation system

Interactive web interface

FastAPI backend for predictions

Tech Stack
Machine Learning

Python

Scikit-learn

XGBoost

NumPy

Joblib

Backend

FastAPI

Uvicorn

Frontend

HTML

CSS

JavaScript

Machine Learning Model

The prediction system uses an ensemble approach:

Model 1:

Random Forest Classifier

Model 2:

XGBoost Classifier

Final Prediction:

Weighted ensemble of both models

This improves prediction accuracy and stability.

Referral Recommendation Logic

Based on prediction confidence:

Confidence Score	Recommendation
> 0.85	Direct Treatment
0.60 – 0.85	General Physician Review
0.40 – 0.60	Urgent Specialist Referral
< 0.40	Emergency Referral
>
> Project Structure
caremind-ai
│
├── frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── main.py
├── rf_model.pkl
├── xgb_model.pkl
├── label_encoder.pkl
├── symptom_columns.pkl
├── sample.py
└── README.md
>
> Dataset

The model was trained using a dataset containing 377 binary-encoded symptom features and multiple disease classes.

The dataset was used only for training, and the trained models are saved as .pkl files for deployment.

Future Improvements

Mobile application version

Symptom auto-suggestion

Cloud deployment

Integration with medical APIs

User authentication and history tracking
