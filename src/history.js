import React from "react";
import { Link } from "react-router-dom";

const History = ({ chatSessions }) => {
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

          {/* Link to Feedback page */}
          <div className="mt-2">
            <Link
              to="/feedback"
              state={{ chat }}
              className="text-blue-600 hover:underline"
            >
              Give Feedback
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
