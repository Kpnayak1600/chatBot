import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChatBot.css";

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatVisible, setChatVisible] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [showAllKeywords, setShowAllKeywords] = useState(false);

  const fetchMessage = async (userMessage) => {
    try {
      const response = await axios.post("http://localhost:5000/api/chatbot", {
        message: userMessage,
      });
      const botResponse = response.data.message;

      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: botResponse },
      ]);

      // Scroll to the bottom of the chatbox to show the latest messages
      const chatbox = document.getElementById("chatbox");
      chatbox.scrollTop = chatbox.scrollHeight;
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const fetchKeywords = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/keywords");
      setKeywords(response.data.keywords);
    } catch (error) {
      console.error("Error retrieving keywords:", error);
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };
  const handleKeywordClick = (keyword) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: keyword },
    ]);

    // Remove the clicked keyword from the list of suggestions
    setKeywords((prevKeywords) => prevKeywords.filter((kw) => kw !== keyword));

    // Fetch the message
    fetchMessage(keyword);
  };
  const sendMessage = async () => {
    const userMessage = inputMessage.trim();
    if (userMessage === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: inputMessage },
    ]);
    setInputMessage("");
    fetchMessage(userMessage);
  };

  const handleInitialMessages = () => {
    const initialMessages = [
      "Welcome to SciAstra! How can we assist you today?",
      "Feel free to ask us about our services, team, achievements, and more.",
    ];

    setMessages(
      initialMessages.map((message) => ({ type: "bot", text: message }))
    );
  };

  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };

  const toggleShowAllKeywords = () => {
    setShowAllKeywords(!showAllKeywords);
  };

  useEffect(() => {
    handleInitialMessages();
    fetchKeywords();
  }, []);

  return (
    <div>
      {chatVisible && (
        <div id="chatbox" className="Chatbox">
          {messages.map((message, index) => (
            <div key={index} className={message.type}>
              <span
                style={{
                  color: message.type === "user" ? "blue" : "green",
                  textEmphasis: "Highlight",
                }}
              >
                {message.type === "user" ? "You: " : "SciAstra Bot: "}
              </span>
              {message.type === "user" ? (
                <div
                  style={{
                    backgroundColor: "LightBlue",
                    padding: "8px",
                    margin: "5px 0",
                    borderRadius: "8px",
                  }}
                >
                  {message.text}
                </div>
              ) : (
                <div
                  style={{
                    backgroundColor: "LightGreen",
                    padding: "8px",
                    margin: "5px 0",
                    borderRadius: "8px",
                  }}
                >
                  {message.text}
                </div>
              )}
            </div>
          ))}

          <div className="SuggestionBox">
            {keywords
              .slice(0, showAllKeywords ? keywords.length : 4)
              .map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => {
                    handleKeywordClick(keyword);
                  }}
                  className="KeywordButton"
                >
                  {keyword}
                </button>
              ))}
            {keywords.length > 4 && (
              <span
                className="KeywordButton"
                onClick={toggleShowAllKeywords}
                style={{ cursor: "pointer", color: "blue" }}
              >
                {showAllKeywords ? "Show Less" : "Show More"}
              </span>
            )}
          </div>
        </div>
      )}
      {chatVisible && (
        <div className="UserInput">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button onClick={sendMessage}>📤</button>
        </div>
      )}
      <button className="StartChatButton" onClick={toggleChat}>
        {chatVisible ? "Close Chat" : "Chat🤖"}
      </button>
    </div>
  );
}

export default ChatBot;
