import React, { useEffect, useState } from "react";
import sample from "./aiData/sampleData.json";
import "./dashboard.css";

const Dashboard = ({ activeChat, saveChatSession }) => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(activeChat?.messages || []);
  }, [activeChat]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let response = "Sorry, Did not understand your query!";
    for (let i = 0; i < sample.length; i++) {
      if (query.toLowerCase() === sample[i].question.toLowerCase()) {
        response = sample[i].response;
        break;
      }
    }

    const newMessages = [
      ...messages,
      { sender: "You", text: query },
      { sender: "Soul AI", text: response },
    ];

    setMessages(newMessages);
    setQuery("");
  };

  const handleSave = () => {
    saveChatSession(messages);
  };

  return (
    <div className="main-chat ">

      <form onSubmit={handleSubmit} className="chat-form">

        <input
          type="text"
          placeholder="Message Bot AI..."
          value={query}
          className="chat-input"
          onChange={(e) => setQuery(e.target.value)}
          
        />

        <button
          type="submit"
          className="chat-btn"
        >
          Ask
        </button>

        <button
          type="submit"
          onClick={handleSave}
          className="chat-btn"
        >
          Save
        </button>

      </form>

     <div className="message flex flex-col gap-2 mt-4">

        {messages.map((msg, idx) => (
          <div key ={idx}>

            <p>
  <span>{msg.sender === "Soul AI" ? "Soul AI" : "You"}:</span> {msg.text}
</p>


           


            </div>
        ))}



      </div>


    </div>
  );
};

export default Dashboard;
