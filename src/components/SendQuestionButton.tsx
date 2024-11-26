"use client";

interface SendQuestionButtonProps {
  onSendMessage: () => void;
}

const SendQuestionButton: React.FC<SendQuestionButtonProps> = ({ onSendMessage }) => {
  return (
    <button
      onClick={onSendMessage}
      className="bg-teal-500 text-white p-2 rounded-full hover:bg-teal-600"
    >
      Enviar
    </button>
  );
};

export default SendQuestionButton;
