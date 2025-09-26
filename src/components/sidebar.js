import React from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";


const Sidebar = ({ chatSessions, loadChat, startNewChat }) => {
    const navigate = useNavigate();
  return (
    <div className="sidebar">
      <button className="sidebar-btn" onClick={startNewChat}>
        New Chat
      </button>

      <div className="sidebar-section">

        {/* <h4 className="sidebar-heading">Past Conversations</h4> */}
         <button className="sidebar-btn" onClick={() => navigate("/history")}>
        Past Conversations
      </button>

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
