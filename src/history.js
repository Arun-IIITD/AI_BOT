import React from "react";

const History = ({ chatSessions }) => {
  return (
    <div>
      <h2>Past Conversations</h2>
      {chatSessions.length === 0 && <p>No conversations yet.</p>}
      {chatSessions.map((chat) => (
        <div key={chat.id} className="mb-4 p-2 border rounded">
          <h4>{chat.title}</h4>
          {chat.messages.map((msg, idx) => (
            <p key={idx}>{msg.text}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default History;
