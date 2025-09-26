import React from "react";

const History = ({ chatSessions, loadChat }) => {
  return (
    <div className="history-page">
      <h2>Past Conversations</h2>

      {chatSessions.length === 0 && <p>No past conversations yet.</p>}

      {chatSessions.map((chat) => (
        <div key={chat.id} className="chat-history">
          <h3>{chat.title}</h3>

          <ul className="messages-list">
            {chat.messages.map((msg, idx) => (
              <li key={idx} className={msg.sender === "You" ? "user-msg" : "ai-msg"}>
                <strong>{msg.sender}:</strong> {msg.text}
                {msg.sender === "Soul AI" && msg.feedback && (
                  <span className="msg-feedback"> ({msg.feedback})</span>
                )}
              </li>
            ))}
          </ul>

          {chat.endFeedback && (
            <div className="end-feedback">
              <p>
                <strong>Rating:</strong> {chat.endFeedback.rating} / 5
              </p>
              <p>
                <strong>Notes:</strong> {chat.endFeedback.feedback}
              </p>
            </div>
          )}

          <button type="button" onClick={() => loadChat(chat)}>
            Continue This Chat
          </button>
        </div>
      ))}
    </div>
  );
};

export default History;
