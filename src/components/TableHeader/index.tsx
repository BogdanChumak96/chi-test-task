import { headerTitle } from "@utils/constants";

const TableHeader: React.FC = () => {
  const renderedHeaders = headerTitle.map((header, index) => (
    <th key={index}>{header.label}</th>
  ));

  return (
    <thead>
      <tr>{renderedHeaders}</tr>
    </thead>
  );
};

export default TableHeader;
