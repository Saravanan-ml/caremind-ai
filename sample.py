import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# ==============================
# 1️⃣ Load Dataset
# ==============================

df = pd.read_csv("Final_Augmented_dataset_Diseases_and_Symptoms.csv")

print("Original Shape:", df.shape)
print("Original Disease Count:", df["diseases"].nunique())

# ==============================
# 2️⃣ Remove Rare Diseases (<2 samples)
# ==============================

disease_counts = df["diseases"].value_counts()
valid_diseases = disease_counts[disease_counts > 1].index
df = df[df["diseases"].isin(valid_diseases)]

# ==============================
# 3️⃣ Keep Only Top 30 Diseases
# ==============================

top_n = 30
top_diseases = df["diseases"].value_counts().head(top_n).index
df = df[df["diseases"].isin(top_diseases)]

print("\nAfter Keeping Top 30 Diseases:")
print("Shape:", df.shape)
print("Disease Count:", df["diseases"].nunique())

# ==============================
# 4️⃣ Limit 300 Samples Per Disease (FIXED VERSION)
# ==============================

df = (
    df.groupby("diseases", group_keys=False)
      .apply(lambda x: x.sample(min(len(x), 300), random_state=42))
      .reset_index(drop=True)
)

print("\nAfter Limiting Samples:")
print("Final Shape:", df.shape)

# ==============================
# 5️⃣ Separate Features & Target
# ==============================

X = df.drop("diseases", axis=1)
y = df["diseases"]

# ==============================
# 6️⃣ Encode Target
# ==============================

le = LabelEncoder()
y_encoded = le.fit_transform(y)

# ==============================
# 7️⃣ Train-Test Split
# ==============================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_encoded,
    test_size=0.2,
    random_state=42,
    stratify=y_encoded
)

print("\nTrain/Test Split Done")
print("Training Shape:", X_train.shape)
print("Testing Shape:", X_test.shape)

# ==============================
# 8️⃣ Train Random Forest
# ==============================

print("\nTraining Random Forest...")

rf_model = RandomForestClassifier(
    n_estimators=30,
    max_depth=15,
    n_jobs=-1,
    random_state=42
)

rf_model.fit(X_train, y_train)

y_pred = rf_model.predict(X_test)

print("\nRandom Forest Accuracy:", accuracy_score(y_test, y_pred))


# ==============================
# 9️⃣ Train XGBoost Model
# ==============================

from xgboost import XGBClassifier

print("\nTraining XGBoost...")

xgb_model = XGBClassifier(
    objective="multi:softprob",
    num_class=30,        # since we kept top 30 diseases
    n_estimators=50,     # small for laptop
    max_depth=6,
    learning_rate=0.1,
    subsample=0.8,
    colsample_bytree=0.8,
    eval_metric="mlogloss",
    use_label_encoder=False
)

xgb_model.fit(X_train, y_train)

y_pred_xgb = xgb_model.predict(X_test)

print("\nXGBoost Accuracy:", accuracy_score(y_test, y_pred_xgb))



# ==============================
# 🔟 Ensemble Model
# ==============================

import numpy as np

print("\nBuilding Ensemble Model...")

# Get probabilities instead of predictions
rf_probs = rf_model.predict_proba(X_test)
xgb_probs = xgb_model.predict_proba(X_test)

# Weighted average
ensemble_probs = 0.6 * xgb_probs + 0.4 * rf_probs

ensemble_preds = np.argmax(ensemble_probs, axis=1)

print("\nEnsemble Accuracy:", accuracy_score(y_test, ensemble_preds))



# ==============================
# 11️⃣ Confidence Score
# ==============================

confidence_scores = np.max(ensemble_probs, axis=1)

print("\nSample Confidence Scores (first 10):")
print(confidence_scores[:10])

# ==============================
# 11️⃣ Confidence Score
# ==============================

confidence_scores = np.max(ensemble_probs, axis=1)

print("\nSample Confidence Scores (first 10):")
print(confidence_scores[:10])

# ==============================
# 12️⃣ Referral Decision Logic
# ==============================

def referral_logic(conf):
    if conf > 0.85:
        return "Direct Treatment"
    elif conf > 0.60:
        return "General Physician Review"
    elif conf > 0.40:
        return "Urgent Specialist Referral"
    else:
        return "Emergency Referral"

print("\nSample Referral Decisions (first 10):")
print([referral_logic(c) for c in confidence_scores[:10]])


# ==============================
# 13️⃣ Convert Prediction to Disease Name
# ==============================

# Convert ensemble predictions back to disease names
predicted_diseases = le.inverse_transform(ensemble_preds)

print("\nSample Predicted Diseases (first 10):")
print(predicted_diseases[:10])


import joblib

# Save models
joblib.dump(rf_model, "rf_model.pkl")
joblib.dump(xgb_model, "xgb_model.pkl")
joblib.dump(le, "label_encoder.pkl")
joblib.dump(X.columns.tolist(), "symptom_columns.pkl")
print("\nModels saved successfully!")