import { createContext, useState } from "react";
import run from "../config/gemini"; // Import API function

export const Context = createContext();

const ContextProvider = (props) => {
  // State Management
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Typewriter Effect (Simulated Delayed Display)
  const delayPara = (index, word) => {
    setTimeout(() => setResultData((prev) => prev + word + " "), 75 * index);
  };

  // Reset State for New Chat
  const newChat = () => {
    setShowResult(false);
    setLoading(false);
  };

  // API Call & Response Handling
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let usedPrompt = prompt || input; // Use provided prompt or input
    setRecentPrompt(usedPrompt);
    setPreviousPrompts((prev) => [...prev, usedPrompt]);

    try {
      const response = await run(usedPrompt);
      let formattedResponse = response
        .split("**") // Convert bold formatting
        .map((text, i) => (i % 2 ? `<b>${text}</b>` : text))
        .join("")
        .split("*") // Convert line breaks
        .join("</br>")
        .split(" "); // Split into words

      formattedResponse.forEach((word, i) => delayPara(i, word));
    } catch (error) {
      setResultData("An error occurred. Please try again.");
      console.error("API Error:", error);
    } finally {
      setLoading(false);
      setInput(""); // Clear input
    }
  };

  return (
    <Context.Provider
      value={{
        prevPrompt,
        setPreviousPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        resultData,
        input,
        setInput,
        loading,
        newChat,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
