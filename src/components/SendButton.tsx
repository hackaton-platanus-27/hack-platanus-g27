interface PastelButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export default function PastelButton({
  onClick,
  disabled = false,
}: PastelButtonProps) {
  return (
    <button
      className={`px-6 py-2 mt-10 text-white rounded-lg focus:outline-none transition duration-300 ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-teal-500 hover:bg-teal-600"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      Enviar Respuesta
    </button>
  );
}
