from sklearn.metrics import accuracy_score, classification_report
def print_accuracy(Y_test, Y_Predict):
    print(f'Accuracy: {accuracy_score(Y_test, Y_Predict)}')
    print(f'\nClassification Report:\n {classification_report(Y_test, Y_Predict)}')