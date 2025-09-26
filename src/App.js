import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar";
import Dashboard from "./dashboard";
import "./dashboard.css";

const STORAGE_KEY = "chatSessions";

const App = () => {
  const [chatSessions, setChatSessions] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setChatSessions(parsed);
    }
  }, []);

  // Save to localStorage whenever sessions change
  useEffect(() => {
    if (chatSessions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chatSessions));
    }
  }, [chatSessions]);

  // Save or update a chat session
  const saveChatSession = (messages) => {
    if (!messages || messages.length === 0) return;

    const firstUserMsg = messages.find((msg) => msg.sender === "You");
    const title = firstUserMsg?.text || `Chat ${chatSessions.length + 1}`;

    if (activeChat) {
      const updatedChat = { ...activeChat, title, messages };
      setChatSessions((prev) =>
        prev.map((chat) => (chat.id === activeChat.id ? updatedChat : chat))
      );
      setActiveChat(updatedChat);
    } else {
      const newSession = {
        id: `${chatSessions.length + 1}`,
        title,
        messages,
      };
      setChatSessions((prev) => [...prev, newSession]);
      setActiveChat(newSession);
    }
  };

  const loadChat = (chat) => setActiveChat(chat);

  const startNewChat = () => {
    const timestamp = new Date().toLocaleString();
    const newChat = {
      id: `${chatSessions.length + 1}`,
      title: `Chat at ${timestamp}`,
      messages: [],
    };
    setChatSessions((prev) => [...prev, newChat]);
    setActiveChat(newChat);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        chatSessions={chatSessions}
        loadChat={loadChat}
        startNewChat={startNewChat}
      />
      <div className="main-chat flex-1">
        <Dashboard activeChat={activeChat} saveChatSession={saveChatSession} />
      </div>
    </div>
  );
};

export default App;
