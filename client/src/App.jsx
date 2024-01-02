import React from "react";
import ChatBot from "./chatBot";
import "./App.css";
const App = () => {
  return (
    <>
      <h1>SciAstra : chatBot</h1>
      <h5>click on right bottoms chat 🤖</h5>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "400px", // Adjust the width as needed
          height: "500px", // Adjust the height as needed
          borderRadius: "5%",
          overflow: "hidden", // Hide overflow if content is taller than the container
        }}
      >
        <ChatBot />
      </div>
    </>
  );
};

export default App;
