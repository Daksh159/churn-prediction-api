# 📉 Customer Churn Prediction System

An end-to-end **machine learning application** that predicts customer churn probability using historical behavioral data, with a **production-ready backend**, **interactive frontend**, and **human-readable explanations**.

---

## 🔗 Live Demo

* **Frontend (React + Netlify)**
  👉 [https://churn-prediction-ranking.netlify.app/](https://churn-prediction-ranking.netlify.app/)

* **Backend API (FastAPI + Render)**
  👉 [https://churn-prediction-api-q7sr.onrender.com/docs](https://churn-prediction-api-q7sr.onrender.com/docs)

---

## 🧠 Problem Statement

Customer churn is a critical business problem where customers stop using a product or service.
The goal of this project is to **predict whether a customer is likely to churn** and provide **interpretable insights** behind the prediction.

---

## 🏗️ System Architecture

```
Frontend (React + Vite)
        |
        |  REST API (JSON)
        ↓
Backend (FastAPI)
        |
        |  ML Inference
        ↓
Scikit-learn Pipeline
```

* Frontend and backend are maintained in a **monorepo**
* Deployed independently for scalability and clarity

---

## ✨ Features

* 🔮 Real-time customer churn prediction
* 📊 Probability visualization with color-coded confidence bar
* 🧠 Human-readable explanation of key churn drivers
* ⚡ FastAPI-powered inference API
* 🎨 Clean, responsive, dashboard-style UI
* ☁️ Cloud deployment with Netlify & Render

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* JavaScript
* CSS
* Framer Motion (animations)
* Netlify (deployment)

### Backend

* FastAPI
* Python
* Scikit-learn
* Pandas
* Uvicorn
* Render (deployment)

### Machine Learning

* Supervised classification model
* Feature preprocessing using sklearn Pipelines
* Probability-based churn scoring

---

## 📂 Repository Structure

```
churn-prediction/
│
├── churn_backend/          # FastAPI + ML backend
│   ├── app.py
│   ├── model_loader.py
│   ├── Best_Model.pkl
│   └── ...
│
├── churn-frontend/         # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── requirements.txt
├── render.yaml
├── .gitignore
└── README.md
```

---

## 🚀 How It Works

1. User enters customer details in the frontend
2. Frontend sends data as JSON to FastAPI backend
3. Backend preprocesses input using a trained ML pipeline
4. Model returns:

   * Churn prediction (0 / 1)
   * Churn probability
5. Frontend visualizes:

   * Risk level
   * Probability bar
   * Explanation of contributing factors

---

## 🧠 Model Explainability

The application provides **human-readable explanations** based on customer behavior patterns such as:

* Support call frequency
* Payment delays
* Contract type
* Tenure
* Total spend

> Future enhancement: Integration of SHAP values for model-level explainability.

---

## 🧪 API Example

**POST `/predict`**

```json
{
  "Age": 45,
  "Gender": "Male",
  "Tenure": 24,
  "Usage_Frequency": 8,
  "Support_Calls": 0,
  "Payment_Delay": 0,
  "Subscription_Type": "Premium",
  "Contract_Length": "Annual",
  "Total_Spend": 4200,
  "Last_Interaction": 3
}
```

---

## 🎯 Key Learnings

* Production ML deployment with FastAPI
* Monorepo architecture for full-stack systems
* API–frontend integration
* Deployment parity between local and cloud environments
* Practical ML explainability for business users

---

## 📌 Future Improvements

* SHAP-based explainability visualizations
* Prediction history & analytics dashboard
* Authentication & role-based access
* Model retraining pipeline
