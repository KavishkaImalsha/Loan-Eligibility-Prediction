from preprocessing import data_preprocessing
from sklearn.linear_model import LogisticRegression
import joblib

if __name__ == '__main__':
    path = '../dataset'
    X_train, X_test, Y_train, Y_test = data_preprocessing(path)

    model = LogisticRegression(max_iter=1000)
    model.fit(X_train, Y_train)
    joblib.dump(model, '../models/loan_model.pkl')
    print("Logistic Regression model saved successfully.")
    