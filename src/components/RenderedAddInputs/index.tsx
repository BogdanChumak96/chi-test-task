import styles from "./styles.module.scss";
export interface InputData {
  label: string;
  name: string;
  value: any;
  errorMessage: string;
  handleInputChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  options?: { value: string; label: string }[];
}

interface RenderedInputsProps {
  inputs: InputData[];
  handleInputChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const RenderedInputs: React.FC<RenderedInputsProps> = ({
  inputs,
  handleInputChange,
}) => {
  return (
    <>
      {inputs.map((input) => (
        <div key={input.name}>
          <label>{input.label}</label>
          {input.name === "availability" ? (
            <select
              name={input.name}
              value={input.value}
              onChange={handleInputChange}
            >
              {input.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              name={input.name}
              value={input.value}
              onChange={handleInputChange}
            />
          )}
          {input.errorMessage && (
            <span className={styles.error_message}>{input.errorMessage}</span>
          )}
        </div>
      ))}
    </>
  );
};

export default RenderedInputs;
