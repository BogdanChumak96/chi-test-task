import styles from "./styles.module.scss";

const NoResults: React.FC = () => {
  return (
    <div className={styles.no_results}>
      <p className={styles.no_results_message}>No results found.</p>
    </div>
  );
};

export default NoResults;
