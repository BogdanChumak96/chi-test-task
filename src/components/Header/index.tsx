import { ModalVariants } from "@utils/constants";
import { IHeader } from "../../types";
import "./styles.css";

const Header: React.FC<IHeader> = ({
  searchText,
  handleSearchChange,
  handleOpenModal,
}) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleSearchChange}
        className="search-input"
      />
      <button
        onClick={() => handleOpenModal(null, ModalVariants.ADD)}
        className="add-new"
      >
        Add new car
      </button>
    </div>
  );
};

export default Header;
