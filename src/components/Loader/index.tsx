import styles from "./styles.module.scss";

const Loader = () => {
  return (
    <div className={styles.loader_overlay}>
      <div className={styles.loader_container}>
        <div className={styles.loader_spinner}></div>
      </div>
    </div>
  );
};

export default Loader;
