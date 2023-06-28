import "./style.css";

interface ErrorProps {
  message: string;
}

const ErrorLoading: React.FC<ErrorProps> = () => {
  return <div className="error">error</div>;
};

export default ErrorLoading;
