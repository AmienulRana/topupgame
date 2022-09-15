import styles from "./loading.module.css";

export const Loading = () => {
  return (
    <div className={styles["lds-ring"]}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
