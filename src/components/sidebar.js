import React from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";


const Sidebar = ({ chatSessions, loadChat, startNewChat, deleteChat }) => {
    const navigate = useNavigate();
  return (
    <div className="sidebar">
      <button 
      className="sidebar-btn" 
      placeholder="Message Bot AI..."
       onClick={() => {
          startNewChat();
          navigate("/dashboard"); 
        }}
        >
        New Chat
      </button>

      <div className="sidebar-section">

        {/* <h4 className="sidebar-heading">Past Conversations</h4> */}
         <button className="sidebar-btn" onClick={() => navigate("/history")}>
        Past Conversations
      </button>

      
        <button className="sidebar-btn" onClick={() => navigate("/feedback")}>
          Feedback Overview
        </button>



        <ul className="sidebar-list">
          {chatSessions.length === 0 && <li>No conversations yet</li>}
          {chatSessions.map((chat) => (
             <li key={chat.id} className="sidebar-item">
              <span onClick={() => loadChat(chat)}>{chat.title}</span>
              <button
                className="delete-btn"
                onClick={() => deleteChat(chat.id)}
              >
                del
              </button>
            </li>
       
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
