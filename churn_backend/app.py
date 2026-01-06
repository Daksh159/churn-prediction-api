from fastapi import FastAPI
from churn_backend.model_loader import pipeline
import pandas as pd

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel, Field
from pydantic import ConfigDict
from fastapi import HTTPException

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://churn-prediction-api-q7sr.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

FEATURE_MAP = {
    "Usage_Frequency": "Usage Frequency",
    "Support_Calls": "Support Calls",
    "Payment_Delay": "Payment Delay",
    "Subscription_Type": "Subscription Type",
    "Contract_Length": "Contract Length",
    "Total_Spend": "Total Spend",
    "Last_Interaction": "Last Interaction",
}


class CustomerInput(BaseModel):
    Age: int = Field(..., ge=18, le=100)
    Gender: str
    Tenure: float = Field(..., ge=0)
    Usage_Frequency: float = Field(..., ge=0)
    Support_Calls: float = Field(..., ge=0)
    Payment_Delay: float = Field(..., ge=0)
    Subscription_Type: str
    Contract_Length: str
    Total_Spend: float = Field(..., ge=0)
    Last_Interaction: float = Field(..., ge=0)


@app.get("/")
def health():
    return {"status": "API is running"}

@app.post("/predict")
def predict(customer: CustomerInput):
    try:
        df = pd.DataFrame([customer.model_dump()])
        df = df.rename(columns=FEATURE_MAP)
        df = df[pipeline.feature_names_in_]

        prediction = pipeline.predict(df)[0]
        probability = pipeline.predict_proba(df)[0][1]

        return {
            "churn_prediction": int(prediction),
            "churn_probability": round(float(probability), 4)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))









