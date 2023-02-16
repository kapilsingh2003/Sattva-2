from transformers import Speech2TextProcessor, Speech2TextForConditionalGeneration
import librosa
import warnings


class Speech2Text:

    def __init__(self):
        warnings.filterwarnings("ignore")
        self.model = Speech2TextForConditionalGeneration.from_pretrained("facebook/s2t-small-librispeech-asr")
        self.processor = Speech2TextProcessor.from_pretrained("facebook/s2t-small-librispeech-asr")


    def process(self, file_name, sr=16000):
        waveform, sample_rate = librosa.load(file_name, sr=sr)

        inputs = self.processor(waveform, sampling_rate=sample_rate, return_tensors="pt")
        generated_ids = self.model.generate(inputs["input_features"], attention_mask=inputs["attention_mask"])
        transcription = self.processor.batch_decode(generated_ids, skip_special_tokens=True)
        return transcription