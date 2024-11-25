"use client";

import axios from "axios";
import { useState } from "react";

export default function SendQuestionButton({
  // eslint-disable-next-line
  questionData,
  userAnswer,
  // eslint-disable-next-line
  userQuery,
  onSendQuestion,
  onReceiveResponse,
  // eslint-disable-next-line
  onSessionReceived,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  questionData: any;
  userAnswer?: string;
  userQuery: string;
  onSendQuestion?: () => void;
  onReceiveResponse?: (response: string) => void;
  onSessionReceived?: (sessionId: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const sendQuestion = async () => {
    setIsLoading(true);
    const urlLambda = "https://hack-backend-gwys.onrender.com/ai-tutor/";
    /*const agentAliasId = "3WUDBKQFAO";
    const agentId = "FJZGDZOHZV";

    const updatedQuestionData = {
      ...questionData,
      r_usuario: userAnswer || "no-option-selected-yet",
      consulta_usuario: userQuery,
    };

    const jsonData = {
      input_text: JSON.stringify(updatedQuestionData),
      agent_alias_id: agentAliasId,
      agent_id: agentId
    };

    console.log({ updatedQuestionData });*/

    const body = {
      // question: userAnswer ?? userQuery,
      ...questionData,
      r_usuario: userAnswer ?? "no-option-selected-yet",
      consulta_usuario: userQuery,
    };
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://hack-backend-gwys.onrender.com",
      },
    };
    console.log({ body, options });

    try {
      console.log(userAnswer, userQuery);
      const responseData = await axios
        .post(urlLambda, body, options)
        .then((res) => {
          console.log(res);
          if (res.status === 200) return res.data;
        })
        .catch((error: Error) => {
          console.error("Error sending question:", error);
        });

      /*const newChatbotMessage = responseData?.response || "";
      const currentChatbotSessionId = responseData?.session_id;
      if (onSessionReceived) onSessionReceived(currentChatbotSessionId);*/
      console.log(responseData);
      if (onSendQuestion) onSendQuestion();
      if (onReceiveResponse) onReceiveResponse(responseData?.msg);
    } catch (error) {
      console.error("Error sending question:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={sendQuestion}
      className="px-4 py-2 ml-2 font-medium text-white bg-teal-500 rounded hover:bg-teal-600 focus:outline-none"
      disabled={isLoading}
    >
      {isLoading ? 
        <div role="status">
            <svg aria-hidden="true" className="size-6 text-gray-200 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
            <span className="sr-only">Loading...</span>
        </div>
      : "ir 🤖"}
    </button>
  );
}
