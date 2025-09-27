import React from "react";

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
              <li key={idx}>
                <p>
                  <strong>{msg.sender}:</strong> {msg.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default History;
