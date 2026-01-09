import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

const API_URL = "https://churn-prediction-api-q7sr.onrender.com/predict";

function App() {
  const [form, setForm] = useState({
    Age: 30,
    Gender: "Male",
    Tenure: 12,
    Usage_Frequency: 5,
    Support_Calls: 0,
    Payment_Delay: 0,
    Subscription_Type: "Basic",
    Contract_Length: "Monthly",
    Total_Spend: 500,
    Last_Interaction: 10,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Age: Number(form.Age),
          Gender: form.Gender,
          Tenure: Number(form.Tenure),
          Usage_Frequency: Number(form.Usage_Frequency),
          Support_Calls: Number(form.Support_Calls),
          Payment_Delay: Number(form.Payment_Delay),
          Subscription_Type: form.Subscription_Type,
          Contract_Length: form.Contract_Length,
          Total_Spend: Number(form.Total_Spend),
          Last_Interaction: Number(form.Last_Interaction),
        }),
      });

      if (!response.ok) throw new Error("API error");

      const data = await response.json();
      setResult(data);
    } catch {
      setError("Unable to connect to prediction service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="header">
        <h1>Customer Churn Prediction</h1>
        <p>Predict whether a customer is likely to churn using ML</p>
      </header>

      <div className="dashboard">
        {/* LEFT PANEL */}
        <div className="panel form-panel">
          <h2>Customer Details</h2>

          <div className="grid">
            {Object.keys(form).map((key) => (
              <div className="field" key={key}>
                <label>{key.replaceAll("_", " ")}</label>

                {["Gender", "Subscription_Type", "Contract_Length"].includes(
                  key
                ) ? (
                  <select
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                  >
                    {key === "Gender" && (
                      <>
                        <option>Male</option>
                        <option>Female</option>
                      </>
                    )}
                    {key === "Subscription_Type" && (
                      <>
                        <option>Basic</option>
                        <option>Standard</option>
                        <option>Premium</option>
                      </>
                    )}
                    {key === "Contract_Length" && (
                      <>
                        <option>Monthly</option>
                        <option>Annual</option>
                      </>
                    )}
                  </select>
                ) : (
                  <input
                    type="number"
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}
          </div>

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Predicting..." : "Predict Churn"}
          </button>

          {error && <p className="error">{error}</p>}
        </div>

        {/* RIGHT PANEL */}
        <div className="panel result-panel">
          {!result && (
            <p className="placeholder">
              Fill customer details and click <b>Predict Churn</b> to see results.
            </p>
          )}

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Prediction */}
                <div
                  className="result-card"
                  style={{
                    borderLeft:
                      result.churn_prediction === 1
                        ? "6px solid #e53935"
                        : "6px solid #43a047",
                  }}
                >
                  <h2>
                    {result.churn_prediction === 1
                      ? "🚨 High Churn Risk"
                      : "✅ Low Churn Risk"}
                  </h2>

                  <p className="probability-text">
                    Churn Probability:{" "}
                    <strong>
                      {(result.churn_probability * 100).toFixed(2)}%
                    </strong>
                  </p>

                  <div className="prob-bar">
                    <motion.div
                      className="prob-fill"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${result.churn_probability * 100}%`,
                      }}
                      transition={{ duration: 0.6 }}
                      style={{
                        background:
                          result.churn_probability > 0.6
                            ? "#e53935"
                            : result.churn_probability > 0.4
                            ? "#fbc02d"
                            : "#43a047",
                      }}
                    />
                  </div>
                </div>

                {/* Explanation */}
                <div className="explanation-card">
                  <h3>Key factors influencing this prediction</h3>
                  <p className="explain-note">
                    Based on customer behavior patterns learned from historical
                    data.
                  </p>
                  <ul>
                    {form.Support_Calls > 3 && (
                      <li>📞 Frequent support calls indicate dissatisfaction</li>
                    )}
                    {form.Payment_Delay > 0 && (
                      <li>⏳ Payment delays increase churn risk</li>
                    )}
                    {form.Contract_Length === "Monthly" && (
                      <li>📄 Monthly contracts churn more than long-term ones</li>
                    )}
                    {form.Total_Spend < 1000 && (
                      <li>💰 Lower total spend suggests weaker engagement</li>
                    )}
                    {form.Tenure < 12 && (
                      <li>🕒 Newer customers are more likely to churn</li>
                    )}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default App;
