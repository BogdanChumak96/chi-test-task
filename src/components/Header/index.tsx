import { ModalVariants } from "@utils/constants";
import { IHeader } from "../../types";
import "./styles.css";
import AddNewCarButton from "@components/AddNewButton";

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
      <AddNewCarButton handleOpenModal={handleOpenModal} title={"Add New"} />
    </div>
  );
};

export default Header;
