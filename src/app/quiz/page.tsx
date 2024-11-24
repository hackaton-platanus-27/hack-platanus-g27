"use client";
import { useState, useEffect } from "react";
import QuestionBox from "@/components/QuestionBox";
import NextButton from "@/components/NextButton";
import SendButton from "@/components/SendButton";

export default function QuizPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: number | null;
  }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://v7574x625rfp77q6wjzpyk6s7i0cdrho.lambda-url.us-east-1.on.aws/";
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleNext = () => {
    if (data && currentQuestionIndex < data.preguntas.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    setSubmitted(false);
  };

  const handleOptionClick = (questionId: number, optionId: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSendAnswer = () => {
    console.log({ currentQuestion });
    console.log({ selectedOptions });
    setSubmitted(true);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const currentQuestion = data.preguntas[currentQuestionIndex];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-tr from-blue-100 via-purple-100 to-yellow-100">
      <QuestionBox
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        selectedOption={selectedOptions[currentQuestionIndex]}
        onOptionClick={handleOptionClick}
        submitted={submitted}
      />
      <div>
        <SendButton onClick={handleSendAnswer} disabled={submitted} />
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <NextButton
          text="Siguiente"
          onClick={handleNext}
          disabled={!submitted}
        />
      </div>
    </div>
  );
}
