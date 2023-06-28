import "./style.css";

interface ErrorProps {
  message: string;
}

const ErrorLoading: React.FC<ErrorProps> = ({ message }) => {
  return <div className="error">{message}</div>;
};

export default ErrorLoading;
