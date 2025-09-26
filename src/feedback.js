import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const STORAGE_KEY = "chatFeedbacks"; // separate storage for feedbacks

const Feedback = () => {
  const location = useLocation();
  const { chat } = location.state || {}; // Get the chat object
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbacks, setFeedbacks] = useState({}); // store feedbacks by chat ID

  // Load saved feedbacks from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setFeedbacks(JSON.parse(stored));
  }, []);

  // Handle submit
  const handleSubmit = () => {
    if (!chat || !feedbackText.trim()) return;

    const updatedFeedbacks = {
      ...feedbacks,
      [chat.id]: feedbackText.trim(),
    };

    setFeedbacks(updatedFeedbacks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFeedbacks));
    alert("Feedback saved!");
    setFeedbackText("");
  };

  if (!chat) return <p>No chat selected for feedback.</p>;

  return (
    <div className="feedback-page p-4">
      <h2>Feedback for: {chat.title}</h2>

      <ul className="messages-list">
        {chat.messages.map((msg, idx) => (
          <li
            key={idx}
            className={msg.sender === "You" ? "user-msg" : "ai-msg"}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <label htmlFor="feedback-text" className="font-semibold">
          Your Feedback:
        </label>
        <textarea
          id="feedback-text"
          className="border rounded w-full p-2 mt-1"
          placeholder="Enter your feedback here..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>

        {/* Show existing feedback for this chat */}
        {feedbacks[chat.id] && (
          <p className="mt-2 text-green-700">
            Previous Feedback: {feedbacks[chat.id]}
          </p>
        )}
      </div>
    </div>
  );
};

export default Feedback;
