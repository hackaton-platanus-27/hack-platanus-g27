"use client";
import QuizQuestion from "./QuizQuestion";

interface QuestionBoxProps {
  question: {
    p: string;
    r: {
      a: string;
      b: string;
      c: string;
      d: string;
    };
    r_correcta: string;
  };
  questionNumber: number;
  selectedOption: number | null;
  onOptionClick: (questionId: number, optionId: number) => void;
  submitted: boolean;
}

export default function QuestionBox({
  question,
  questionNumber,
  selectedOption,
  onOptionClick,
  submitted,
}: QuestionBoxProps) {
  return (
    <div className="grid grid-cols-2 max-w-5xl w-full space-y-4 px-4">
      <div className="col-span-2">
        <h1 className="text-2xl font-bold text-gray-700 mb-5">Pregunta {questionNumber}</h1>
        <div className="scrollbar-track-gray-100 rounded-xl">
          <h2 className="text-lg text-left font-light">{question.p}</h2>
        </div>
      </div>

      <div className="w-full lg:w-80 col-span-2  space-y-6 items-center justify-center">
        {Object.keys(question.r).map((key, index) => {
          const optionKey = key as keyof typeof question.r;

          const isCorrect = question.r_correcta === optionKey;

          const quizQuestionClasses = !submitted
            ? selectedOption === index + 1
              ? "bg-blue-100 text-gray-800"
              : "bg-white text-gray-800 border-gray-300"
            : isCorrect
            ? "bg-green-100 text-gray-800"
            : "bg-red-100 text-gray-800";
          return (
            <QuizQuestion
              key={index}
              id={index + 1}
              text={question.r[optionKey]}
              className={quizQuestionClasses}
              onClick={() => onOptionClick(questionNumber - 1, index + 1)}
            />
          );
        })}
      </div>
    </div>
  );
}
