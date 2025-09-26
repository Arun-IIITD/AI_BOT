import React from "react";
import "./Sidebar.css";

const Sidebar = ({ chatSessions, loadChat, startNewChat }) => {
  return (
    <div className="sidebar">
      <button className="sidebar-btn" onClick={startNewChat}>
        + New Chat
      </button>

      <div className="sidebar-section">
        <h4 className="sidebar-heading">Past Conversations</h4>
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
