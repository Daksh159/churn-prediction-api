import joblib
import os

BASE_DIR = os.path.dirname(__file__)
PIPELINE_PATH = os.path.join(BASE_DIR, "churn_pipeline.pkl")

pipeline = joblib.load(PIPELINE_PATH)
