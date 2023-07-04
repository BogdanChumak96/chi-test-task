import { IHeader } from "../../types";
import styles from "./styles.module.scss";
import AddNewCarButton from "@components/AddNewButton";

const Header: React.FC<IHeader> = ({
  searchText,
  handleSearchChange,
  handleOpenModal,
}) => {
  return (
    <div className={styles.search_bar}>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleSearchChange}
        className={styles.search_input}
      />
      <AddNewCarButton handleOpenModal={handleOpenModal} title={"Add New"} />
    </div>
  );
};

export default Header;
