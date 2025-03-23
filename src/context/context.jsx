import { createContext, useState } from "react";
import run from "../config/gemini"; // Import API function

export const Context = createContext();

const ContextProvider = (props) => {
  // State management
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPreviousPromps] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Delayed display for typewriter effect
  const delayPara = (index, word) => {
    setTimeout(() => setResultData((prev) => prev + word + " "), 75 * index);
  };

  // Handles API call and response formatting
  const onSent = async () => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);

    try {
      const response = await run(input);
      let formattedResponse = response
        .split("**") // Bold formatting
        .map((text, i) => (i % 2 ? `<b>${text}</b>` : text))
        .join("")
        .split("*") // Line breaks
        .join("</br>")
        .split(" "); // Split words

      formattedResponse.forEach((word, i) => delayPara(i, word)); // Apply delay
    } catch (error) {
      setResultData("An error occurred. Please try again.");
      console.error("API Error:", error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <Context.Provider
      value={{
        prevPrompt,
        setPreviousPromps,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        resultData,
        input,
        setInput,
        loading,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
