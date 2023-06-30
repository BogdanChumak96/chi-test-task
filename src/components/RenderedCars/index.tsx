import NoResults from "@components/NoResults";
import React from "react";
import { CarsList } from "..";
import { IRenderContent } from "../../types";

const RenderedCars: React.FC<IRenderContent> = ({
  isSuccess,
  visibleCars,
  handleOpenModal,
}) => {
  if (!isSuccess) {
    return null;
  }

  if (visibleCars.length === 0) {
    return (
      <tr>
        <td colSpan={8}>
          <NoResults />
        </td>
      </tr>
    );
  }

  return <CarsList cars={visibleCars} handleOpenModal={handleOpenModal} />;
};

export default RenderedCars;
