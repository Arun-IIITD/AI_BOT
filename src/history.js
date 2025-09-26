import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FEEDBACK_KEY = "chatFeedbacks";

const History = ({ chatSessions }) => {
  const [feedbacks, setFeedbacks] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem(FEEDBACK_KEY);
    if (stored) setFeedbacks(JSON.parse(stored));
  }, []);

  return (
    <div className="history-page">

      <div>Past Conversations</div>

      {chatSessions.length === 0 && <p>No past conversations yet.</p>}

      {chatSessions.map((chat) => (
        <div key={chat.id} className="chat-history">
          <h3>{chat.title}</h3>

          <ul className="messages-list">
            {chat.messages.map((msg, idx) => (
              <li key={idx}>
                <p>
                  <strong>{msg.sender}:</strong> {msg.text}
                </p>
              </li>
            ))}
          </ul>

          {feedbacks[chat.id] && (
            <p className="mt-2 text-green-700">
              <strong>Feedback:</strong> {feedbacks[chat.id]}
            </p>
          )}

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
