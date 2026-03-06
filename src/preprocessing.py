import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

def data_preprocessing(df, training=True):
    #Label encoding
    df['Gender'] = df['Gender'].map({'Male':1, 'Female':0})
    df['Married'] = df['Married'].map({'Yes':1, 'No':0})
    df['Education'] = df['Education'].map({'Graduate':1, 'Not Graduate':0})
    df['Self_Employed'] = df['Self_Employed'].map({'Yes':1, 'No':0})

    if training:
        df.drop(columns=['Customer_ID'],inplace=True)
        df['Loan_Status'] = df['Loan_Status'].map({'Y':1, 'N':0})

    #One hot encording
    df = pd.get_dummies(df, columns=['Property_Area'], drop_first=True, dtype=int)

    if training:
        X_FE = df.drop(columns='Loan_Status')
        Y = df['Loan_Status']

        X_FE['Total_Income'] = X_FE['Applicant_Income'] + X_FE['Coapplicant_Income']
        X_FE['Income_to_Loan'] = X_FE['Total_Income'] / X_FE['Loan_Amount']
        X_FE['Log_Loan_Amount'] = np.log1p(X_FE['Loan_Amount'])  # log(Loan_Amount + 1)

        X_FE_train, X_FE_test, Y_FE_train, Y_FE_test = train_test_split(X_FE, Y, test_size=0.2, shuffle=True, random_state=42)

        return X_FE_train, X_FE_test, Y_FE_train, Y_FE_test
    
    else:
        df['Total_Income'] = df['Applicant_Income'] + df['Coapplicant_Income']
        df['Income_to_Loan'] = df['Total_Income'] / df['Loan_Amount']
        df['Log_Loan_Amount'] = np.log1p(df['Loan_Amount'])  # log(Loan_Amount + 1)
    
        return df 
