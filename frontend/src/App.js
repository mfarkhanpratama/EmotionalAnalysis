import React, { useState } from "react";
import EmotionPredictor from "./components/EmotionPredictor";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        text,
      });
      const predictionResult = response.data;

      const topEmotion = Object.entries(predictionResult).reduce((a, b) =>
        a[1] > b[1] ? a : b
      );

      setResult(predictionResult);
      setHistory((prevHistory) => {
        const newHistory = [
          { text, topEmotion: topEmotion[0], percentage: topEmotion[1] },
          ...prevHistory,
        ];
        return newHistory.slice(0, 5); // Keep only the latest 5 entries
      });
    } catch (err) {
      setError("Error fetching prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App min-h-screen px-12 bg-darkBg lg:px-32 xl:px-64 py-16">
      {/* Create a 2x2 grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Row 1, Column 1: Title */}
        <div className="col-span-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold  font-mono">Emotional Analysis</h1>
          <h2 className="text-xl font-semibold font-mono">by Amilia</h2>
        </div>

        <div className="col-span-1 flex items-center justify-center">
          <EmotionPredictor view="chart" result={result} />
        </div>

        {/* Row 1, Column 2: Text Area for Input */}
        <div className="col-span-1 flex items-center justify-center">
          <EmotionPredictor
            view="input"
            text={text}
            setText={setText}
            handleSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        </div>

        {/* Row 2, Column 1: Chart */}

        {/* Row 2, Column 2: Prediction History Table */}
        <div className="col-span-1 flex items-center justify-center">
          <EmotionPredictor view="history" history={history} />
        </div>
      </div>
    </div>
  );
}

export default App;
