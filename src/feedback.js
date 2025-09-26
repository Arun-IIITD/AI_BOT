import React, { useState } from "react";

const Feedback = ({ chatSessions }) => {
  const [filter, setFilter] = useState(null);

  // collect all feedback entries
  const allFeedback = chatSessions.flatMap((chat) => {
    const aiFeedback = chat.messages
      .filter((msg) => msg.sender === "Soul AI" && msg.feedback)
      .map((msg) => ({
        chatId: chat.id,
        chatTitle: chat.title,
        type: "message",
        feedback: msg.feedback,
      }));

    const convoFeedback = chat.endFeedback
      ? [
          {
            chatId: chat.id,
            chatTitle: chat.title,
            type: "conversation",
            rating: chat.endFeedback.rating,
            feedback: chat.endFeedback.feedback,
          },
        ]
      : [];

    return [...aiFeedback, ...convoFeedback];
  });

  // filter if rating selected
  const filteredFeedback = filter
    ? allFeedback.filter(
        (f) => f.type === "conversation" && f.rating === filter
      )
    : allFeedback;

  return (
    <div>
      <h2>Feedback Overview</h2>

      <div>
        <label>Filter by Rating: </label>
        {[1, 2, 3, 4, 5].map((r) => (
          <button key={r} onClick={() => setFilter(r)}>
            {r} ★
          </button>
        ))}
        <button onClick={() => setFilter(null)}>Clear</button>
      </div>

      {filteredFeedback.length === 0 && <p>No feedback yet.</p>}

      <ul>
        {filteredFeedback.map((f, idx) => (
          <li key={idx}>
            <strong>{f.chatTitle}</strong> —{" "}
            {f.type === "message" ? (
              <span>AI Reply Feedback: {f.feedback}</span>
            ) : (
              <span>
                Rating: {f.rating} / 5 | Notes: {f.feedback}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feedback;
