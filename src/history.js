// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const History = ({ loadChat }) => {
//   const [savedChats, setSavedChats] = useState([]);

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const fetchHistory = () => {
//     axios
//       .get("https://localhost:3000/history")
//       .then((res) => setSavedChats(res.data))
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="history p-4 border-r h-screen w-60">
//       <button
//         className="mb-4 w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         onClick={() => loadChat(null)} // start new chat
//       >
//         + New Chat
//       </button>

//       <h3 className="font-semibold mb-2">Saved Chats</h3>
//       <ul>
//         {savedChats.map((chat) => (
//           <li
//             key={chat.id}
//             className="cursor-pointer p-2 hover:bg-gray-200 rounded"
//             onClick={() => loadChat(chat)}
//           >
//             {chat.title}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default History;
