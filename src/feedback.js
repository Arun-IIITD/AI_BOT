import React from "react";
import { useLocation } from "react-router-dom";

const Feedback = () => {
  const location = useLocation();
  const { chat } = location.state || {}; // Get the chat object

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
        />
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Feedback;
