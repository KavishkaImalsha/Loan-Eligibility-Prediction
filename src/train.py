from preprocessing import data_preprocessing
from sklearn.linear_model import LogisticRegression
import joblib
from accuracy import print_accuracy
import pandas as pd

if __name__ == '__main__':
    path = '../dataset'
    df = pd.read_csv(f'{path}/Loan Eligibility Prediction.csv')
    X_train, X_test, Y_train, Y_test = data_preprocessing(df)

    model = LogisticRegression(max_iter=1000)
    model.fit(X_train, Y_train)

    Y_predict = model.predict(X_test)
    print_accuracy(Y_test, Y_predict)

    joblib.dump(model, '../models/loan_model.pkl')
    print("Logistic Regression model saved successfully.")

    joblib.dump(X_train.columns, "../models/feature_columns.pkl")
    print("Feture columns saved successfully.")
    