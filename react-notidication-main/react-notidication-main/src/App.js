// import React, { useState } from 'react';

// function App() {
//   const [notification, setNotification] = useState({
//     token: 'REPLACE_WITH_FCM_TOKEN', // Replace with the FCM token of the recipient
//     title: '',
//     body: '',
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setNotification({ ...notification, [name]: value });
//   };

//   const sendNotification = () => {
//     fetch('http://localhost:4000/send-notification', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(notification),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data.message);
//       })
//       .catch((error) => {
//         console.error('Error sending notification:', error);
//       });
//   };

//   return (
//     <div>
//       <h1>Send Notification</h1>
//       <input
//         type="text"
//         name="title"
//         placeholder="Title"
//         value={notification.title}
//         onChange={handleInputChange}
//       />
//       <input
//         type="text"
//         name="body"
//         placeholder="Body"
//         value={notification.body}
//         onChange={handleInputChange}
//       />
//       <button onClick={sendNotification}>Send Notification</button>
//     </div>
//   );
// }

// export default App;









import { useEffect } from "react";
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";
import logo from "./logo.svg";
import "./App.css";

function App() {
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey:
          // "BLoUbwsjj3i06Mn2sT46acqNBc2aCKQsHCGWwIm3yBQci8Vx8eaVP-E1lt_FZvN_3cmx0Tc0d5kPmXi6x3kXVG8",
          // "BHY3vWjelhF90Q0S3pz88SCpy51z7-_TLDkAhzE40NJS1FKpy-ZevSOQ148iO52zLNoP3w8ArXnXFY3As8ZfQus",  // ashwani token
          "BNHZRD1UritEqetUD5HIvu3SSJSI7xAnkPHox_33YUrSNguXpg5iIMri85Kpj23ZgHbnCPI58N7le0431vqgARs"
      });
      console.log("Token Gen:-> ", token);
      // Send this token  to server ( db)
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
    // Req user for notification permission
    requestPermission();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>          
      </header>
    </div>
  );
}

export default App;
