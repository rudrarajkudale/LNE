import React, { useState, useEffect } from "react";
import "../styles/Chatbot.css"; // Import the CSS file

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [supportQuestions, setSupportQuestions] = useState([]);
  const [suggestions, setSuggestions] = useState([]); // State for suggestions

  // Fetch supported questions and answers from the backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/data/support`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          setSupportQuestions(data.data);
        } else {
          console.error("Failed to fetch support data");
        }
      })
      .catch((error) => console.error("Error fetching support data:", error));
  }, []);

  // Function to handle user input
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    // Generate bot response
    const botResponse = generateResponse(input);
    const botMessage = { text: botResponse, sender: "bot" };
    setMessages((prev) => [...prev, botMessage]);

    // Clear input and suggestions
    setInput("");
    setSuggestions([]);
  };

  // Function to generate bot responses
  const generateResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    // Check for supported questions
    const matchedQuestion = supportQuestions.find((q) =>
      q.question.toLowerCase().includes(lowerInput)
    );
    if (matchedQuestion) {
      return matchedQuestion.answer;
    }

    // Default response for unrecognized questions
    return "Sorry, I can only answer the following questions: " +
      supportQuestions.map((q) => q.question).join(", ");
  };

  // Function to generate suggestions based on user input
  const generateSuggestions = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    // Filter questions that match the input (case-insensitive and flexible phrasing)
    const matchedSuggestions = supportQuestions.filter((q) => {
      const lowerQuestion = q.question.toLowerCase();
      return (
        lowerQuestion.includes(lowerInput) || // Check if input is in the question
        lowerInput.includes(lowerQuestion) || // Check if question is in the input
        lowerQuestion.split(" ").some((word) => word.includes(lowerInput)) || // Check individual words
        lowerInput.split(" ").some((word) => lowerQuestion.includes(word)) // Check individual words in input
      );
    });

    // Limit to 5 suggestions
    setSuggestions(matchedSuggestions.slice(0, 5));
  };

  // Handle input change and generate suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    // Generate suggestions if the input is not empty
    if (value.trim()) {
      generateSuggestions(value);
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };

  return (
    <div className="chatbotContainer">
      <div className="chatWindow">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "user" ? "userMessage" : "botMessage"}`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="inputContainer">
        <input
          type="text"
          value={input}
          onChange={handleInputChange} // Updated to handle suggestions
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="input"
          placeholder="Ask me anything..."
        />
        <button onClick={handleSend} className="button">
          Send
        </button>
      </div>
      {/* Display suggestions */}
      {suggestions.length > 0 && (
        <div className="suggestionsContainer">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion"
              onClick={() => {
                setInput(suggestion.question); // Auto-fill input with suggestion
                setSuggestions([]); // Clear suggestions
              }}
            >
              {suggestion.question}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Chatbot;