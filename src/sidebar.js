import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ chatSessions, loadChat, startNewChat }) => {
  return (
    <div className="sidebar">
      <Link to="/"  onClick={startNewChat}>
        New Chat
      </Link>

        <Link to="/history" >
          Past Conversations
        </Link>

      <div className="sidebar-section">
      

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
