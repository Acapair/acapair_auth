import { BsExclamationTriangle } from "react-icons/bs";

interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center text-sm gap-x-2 text-destructive">
      <BsExclamationTriangle className="h-4 w-4" />
      <p className="p-1">{message}</p>
    </div>
  );
};

export default FormError;
