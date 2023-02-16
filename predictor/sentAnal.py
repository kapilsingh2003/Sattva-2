from transformers import pipeline

class Analyzer:

    def __init__(self):
        self.classifier = pipeline("text-classification",model='bhadresh-savani/distilbert-base-uncased-emotion', return_all_scores=True)

    def detect_emotion(self, text):
        return self.classifier(text)