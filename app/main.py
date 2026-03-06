from fastapi import FastAPI
import joblib
import pandas as pd
from src.preprocessing import data_preprocessing
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["OPTIONS", "POST", "GET"],
    allow_headers=["*"],
)

Logistic_Reg_model = joblib.load('models/loan_model.pkl')
print("Model successfully loaded")

@app.post('/predict')
def predict(input_data: dict):
    df = pd.DataFrame([input_data])

    proccess_df = data_preprocessing(df, training=False)
    #load features
    features = joblib.load("models/feature_columns.pkl")
    #reindex after data preprocessing
    proccess_df = proccess_df.reindex(columns=features, fill_value=0)
    prediction = Logistic_Reg_model.predict(proccess_df)
    return {"prediction" : int(prediction[0])}



