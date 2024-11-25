"use client";

import { useEffect, useRef, useState } from "react";
import SendQuestionButton from "./SendQuestionButton";

export interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onReceiveResponse: (response: string) => void;
  onSessionReceived: (sessionId: string) => void;
  userAnswer?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  questionData: any;
}

const Chatbot: React.FC<ChatbotProps> = ({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  onReceiveResponse,
  onSessionReceived,
  userAnswer,
  questionData,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  // Handle send button click or Enter key press
  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white/40 backdrop-blur shadow-lg transform transition-transform duration-300 ${
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
              className={`px-4 py-2 rounded-xl max-w-xs font-medium text-sm ${
                message.sender === "user"
                  ? "bg-teal-500 text-white"
                  : "bg-gradient-to-tr from-blue-100 via-purple-100 to-yellow-100 text-gray-700"
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
        <SendQuestionButton
          questionData={questionData}
          userAnswer={userAnswer}
          userQuery={inputValue}
          onSendQuestion={handleSendMessage}
          onReceiveResponse={onReceiveResponse}
          onSessionReceived={onSessionReceived}
        />
      </div>
    </div>
  );
};

export default Chatbot;
