import React, { useEffect, useState } from "react";
import sample from "./aiData/sampleData.json";
import "./dashboard.css";

const Dashboard = ({ activeChat, saveChatSession }) => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(activeChat?.messages || []);
  }, [activeChat]);

  const giveRes = () => {
    let response = "Sorry, did not understand your query!";
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

  const saveChat = () => {
    saveChatSession(messages);
  };

  return (
    <div className="main-chat flex flex-col gap-4 w-full max-w-md">
      {/* Input + buttons */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Message Bot AI..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={giveRes}
          className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Ask
        </button>
        <button
          onClick={saveChat}
          className="px-3 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Save
        </button>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-2 mt-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="">
            <h3 className="font-semibold">{msg.sender}</h3>
            <p>{msg.text}</p>
            <span className="text-xs text-gray-500">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
