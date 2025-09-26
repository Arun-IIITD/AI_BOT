import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FEEDBACK_KEY = "chatFeedbacks";

const History = ({ chatSessions }) => {
  const [feedbacks, setFeedbacks] = useState({});

  // Load feedbacks from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(FEEDBACK_KEY);
    if (stored) setFeedbacks(JSON.parse(stored));
  }, []);

  return (
    <div className="history-page">
      <h2>Past Conversations</h2>

      {chatSessions.length === 0 && <p>No past conversations yet.</p>}

      {chatSessions.map((chat) => (
        <div key={chat.id} className="chat-history">
          <h3>{chat.title}</h3>

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

          {/* Show existing feedback */}
          {feedbacks[chat.id] && (
            <p className="mt-2 text-green-700">
              <strong>Feedback:</strong> {feedbacks[chat.id]}
            </p>
          )}

          {/* Link to Feedback page */}
          <div className="mt-2">
            <Link
              to="/feedback"
              state={{ chat }}
              className="text-blue-600 hover:underline"
            >
              Give Feedback / Update Feedback
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
