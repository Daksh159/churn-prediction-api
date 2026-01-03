from fastapi import FastAPI
from model_loader import pipeline
import pandas as pd

app = FastAPI()

from pydantic import BaseModel, Field
from pydantic import ConfigDict

class CustomerInput(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    Age: int
    Gender: str
    Tenure: float

    Usage_Frequency: float = Field(alias="Usage Frequency")
    Support_Calls: float = Field(alias="Support Calls")
    Payment_Delay: float = Field(alias="Payment Delay")

    Subscription_Type: str = Field(alias="Subscription Type")
    Contract_Length: str = Field(alias="Contract Length")

    MonthlyCharges: float
    Total_Spend: float = Field(alias="Total Spend")
    Last_Interaction: float = Field(alias="Last Interaction")

    PaymentMethod: str
    InternetService: str
    Contract: str


@app.get("/")
def health():
    return {"status": "API is running"}

@app.post("/predict")
def predict(customer: CustomerInput):
    df = pd.DataFrame([customer.model_dump(by_alias=True)])

    print("FINAL DF COLUMNS:", list(df.columns))  # sanity check

    prediction = pipeline.predict(df)[0]
    probability = pipeline.predict_proba(df)[0][1]

    return {
        "churn_prediction": int(prediction),
        "churn_probability": float(probability)
    }







