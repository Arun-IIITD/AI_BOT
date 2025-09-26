import React, { useState } from "react";
import sample from "./aiData/sampleData.json";
import "./dashboard.css";

const Dashboard = ({ activeChat, saveChatSession }) => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState(activeChat?.messages || []);
  const [rating, setRating] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    const userMsg = { sender: "You", text: query };
    let response = sample[query] || "Sorry, Did not understand your query!";

    const aiMsg = { sender: "Soul AI", text: response, feedback: null };

    const updatedMessages = [...messages, userMsg, aiMsg];
    setMessages(updatedMessages);
    setQuery("");
  };

  const handleSave = () => {
    const updatedSession = {
      ...activeChat,
      messages,
      endFeedback: { rating, feedback },
    };
    saveChatSession(updatedSession.messages);
  };

  const handleFeedback = (index, value) => {
    const updated = [...messages];
    updated[index].feedback = value; // thumbs up/down
    setMessages(updated);
  };

  return (
    <div className="dashboard">
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.sender === "You" ? "user" : "ai"}`}
          >
            {msg.sender === "Soul AI" ? (
              <>
                <span>{msg.sender}</span>
                <p>{msg.text}</p>
                <div className="feedback-btns">
                  <button onClick={() => handleFeedback(idx, "like")}>👍</button>
                  <button onClick={() => handleFeedback(idx, "dislike")}>👎</button>
                </div>
              </>
            ) : (
              <>
                <span>{msg.sender}</span>
                <p>{msg.text}</p>
              </>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          placeholder="Message Bot AI..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Ask</button>
      </form>

      <div className="end-feedback">
        <h3>Rate this conversation</h3>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={rating >= star ? "star filled" : "star"}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          placeholder="Leave your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
