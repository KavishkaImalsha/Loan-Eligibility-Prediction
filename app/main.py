from fastapi import FastAPI
import joblib
import pandas as pd
from src.preprocessing import data_preprocessing

app = FastAPI()

Logistic_Reg_model = joblib.load('models/loan_model.pkl')

input_data = {
    "Gender": "Male",
    "Married": "Yes",
    "Education": "Graduate",
    "Self_Employed": "No",
    "Applicant_Income": 5000,
    "Coapplicant_Income": 2000,
    "Loan_Amount": 150,
    "Loan_Amount_Term": 360,
    "Credit_History": 1,
    "Property_Area": "Urban"
}

df = pd.DataFrame([input_data])

proccess_df = data_preprocessing(df, training=False)
#load features
features = joblib.load("models/feature_columns.pkl")
#reindex after data preprocessing
proccess_df = proccess_df.reindex(columns=features, fill_value=0)
prediction = Logistic_Reg_model.predict(proccess_df)

print(prediction[0])

