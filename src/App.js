import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Dashboard from "./dashboard";
import History from "./history";
import "./dashboard.css";
import Feedback from "./feedback";

const STORAGE_KEY = "chatSessions";

const App = () => {
  const [chatSessions, setChatSessions] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setChatSessions(JSON.parse(stored));
  }, []);

  // Save to localStorage always
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chatSessions));
  }, [chatSessions]);

  const saveChatSession = (messages) => {
    if (!messages || messages.length === 0) return;
    const firstUserMsg = messages.find((msg) => msg.sender === "You");
    const title = firstUserMsg?.text || `Chat ${chatSessions.length + 1}`;

    if (activeChat && activeChat.id) {
      // Update existing chat
      const updatedChat = { ...activeChat, title, messages };
      setChatSessions((prev) =>
        prev.map((chat) => (chat.id === activeChat.id ? updatedChat : chat))
      );
      setActiveChat(updatedChat);
    } else {
      // Create new chat
      const newSession = {
        id: Date.now().toString(),
        title,
        messages,
      };
      setChatSessions((prev) => [...prev, newSession]);
      setActiveChat(newSession);
    }
  };

  const loadChat = (chat) => setActiveChat(chat);

  const startNewChat = () => {
    // Clear active chat for new conversation
    setActiveChat({ id: null, title: "", messages: [] });
  };

  return (
    <Router>
      <header className="p-4 bg-gray-800 text-white">
        <h1>Bot AI</h1>
        <nav className="mt-2">
          <Link to="/" className="mr-4">New Chat</Link>
          <Link to="/history">Past Conversations</Link>
        </nav>
      </header>

      <div className="flex h-screen">
        <Sidebar
          chatSessions={chatSessions}
          loadChat={loadChat}
          startNewChat={startNewChat}
        />
        <div className="main-chat flex-1 p-4">
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  activeChat={activeChat}
                  saveChatSession={saveChatSession}
                />
              }
            />
            <Route
              path="/history"
              element={<History chatSessions={chatSessions} />}
            />
            <Route
              path="/feedback"
              element={<Feedback chatSessions={chatSessions} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
