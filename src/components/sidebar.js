import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({ chatSessions, loadChat, startNewChat }) => {
  return (
    <div className="sidebar">
      {/* New Chat as Link for Cypress detection */}
      <Link
        to="/"
        className="sidebar-btn"
        onClick={startNewChat}
      >
        New Chat
      </Link>

      <div className="sidebar-section">
        {/* Past Conversations as Link */}
        <Link to="/history" className="sidebar-btn">
          Past Conversations
        </Link>

        <ul className="sidebar-list">
          {chatSessions.length === 0 && <li>No conversations yet</li>}
          {chatSessions.map((chat) => (
            <li key={chat.id} onClick={() => loadChat(chat)}>
              {chat.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
