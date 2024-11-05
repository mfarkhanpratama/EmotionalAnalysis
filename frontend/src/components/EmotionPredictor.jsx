import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function EmotionPredictor({
  view,
  text,
  setText,
  handleSubmit,
  loading,
  error,
  result,
  history,
}) {
  const chartData = result
    ? Object.entries(result).map(([emotion, percentage]) => ({
        name: emotion,
        value: percentage,
      }))
    : [];

  return (
    <div className="w-full p-4 bg-secDark rounded shadow-lg">
      {/* Input View */}
      {view === "input" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-4 border border-gray-600 bg-darkBg rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-accent"
            rows="6"
            placeholder="Type your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-joy text-white py-2 rounded-lg hover:bg-accent transition"
          >
            {loading ? "Predicting..." : "Predict Emotion"}
          </button>
          {error && (
            <div className="bg-red-500 text-white p-2 rounded-lg mt-2">
              {error}
            </div>
          )}
        </form>
      )}

      {/* Chart View */}
      {view === "chart" && result && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Prediction Result:</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#FFBC2C" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* History View */}
      {view === "history" && history.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2 text-joy">
            Prediction History:
          </h2>
          <table className="min-w-full bg-darkBg border border-gray-700 text-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-700">Text</th>
                <th className="py-2 px-4 border-b border-gray-700">
                  Top Emotion
                </th>
                <th className="py-2 px-4 border-b border-gray-700">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-gray-700 text-gray-300">
                    {entry.text}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-700 text-gray-300">
                    {entry.topEmotion}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-700 text-gray-300">
                    {entry.percentage.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EmotionPredictor;
