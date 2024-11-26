"use client";

import { useEffect, useState, useRef } from "react";
import SendQuestionButton from "./SendQuestionButton";
import { v4 as uuidv4 } from "uuid";

export interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  currentQuestion: any;
}

const Chatbot: React.FC<ChatbotProps> = ({
  isOpen,
  onClose,
  currentQuestion
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Close chatbot when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Ensure sessionId is set or generated when the component is mounted
  useEffect(() => {
    if (!sessionId) {
      const newSessionId = uuidv4();
      setSessionId(newSessionId);
    }
  }, [sessionId]);

  // Send the question to the API and update messages
  const sendQuestion = async (userMessage: string) => {
    const urlLambda = "https://gcev7foxn5p3tcdmbcytrfanlu0ilkgq.lambda-url.us-east-1.on.aws/";
    const agentAliasId = "HQ7HBCXSAU";
    const agentId = "ZY63BV4ZTK";

    const updatedQuestionData = {
      ...currentQuestion,
      consulta_usuario: userMessage,
    };

    const jsonData = {
      input_text: JSON.stringify(updatedQuestionData),
      agent_alias_id: agentAliasId,
      agent_id: agentId,
      session_id: sessionId
    };

    console.log(jsonData);
    
    
    try {
      const response = await fetch(urlLambda, {
        method: "POST",
        body: JSON.stringify(jsonData),
      });
      const responseData = await response.json();
      const currentChatbotSessionId = responseData.session_id;
      setSessionId(currentChatbotSessionId);  // Store session ID

      // Return the bot's response
      return responseData.r || "No pude obtener una respuesta.";
    } catch (error) {
      console.error("Error sending question:", error);
      return "Hubo un error al obtener una respuesta.";
    }
  };

  // Handle send button click or Enter key press
  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      // Add user message
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: inputValue.trim() },
      ]);
      setInputValue("");

      // Get bot response
      const botResponse = await sendQuestion(inputValue.trim());

      // Add bot response after a short delay
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botResponse },
      ]);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-2/3 lg:w-1/3 bg-white/40 backdrop-blur shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      ref={panelRef}
    >
      {/* Chatbot Header */}
      <div className="flex justify-between p-4 bg-gradient-to-tr from-blue-100 via-purple-100 to-yellow-100">
        <div>
          <h2 className="font-bold text-gray-700">IA generativa 🤖</h2>
          <small className="text-xs">Powered by <b>Tres elevado a tres</b></small>
        </div>
        <button
          className="text-gray-600 hover:text-gray-800 hover:border transition-all duration-200 size-8 rounded-full"
          onClick={onClose}
          aria-label="Close Chatbot"
        >
          ✕
        </button>
      </div>
      {/* Chatbot Body */}
      <div
        className="p-4 overflow-y-auto flex-1 h-full"
        style={{ maxHeight: "calc(100% - 168px)" }}
      >
        {/* Render messages */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-sm font-semibold text-sm ${
                message.sender === "user"
                  ? "bg-teal-500 text-white"
                  : "bg-gradient-to-tr from-blue-100 via-purple-100 to-yellow-100 text-gray-500"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      {/* Chatbot Footer */}
      <div className="p-4 flex items-center">
        <input
          type="text"
          className="flex-grow px-3 py-2 border font-medium text-gray-700 rounded bg-transparent outline-none"
          placeholder="¿Tienes alguna duda?"
          value={inputValue}
          onChange={handleInputChange}
        />
        <SendQuestionButton onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chatbot;
