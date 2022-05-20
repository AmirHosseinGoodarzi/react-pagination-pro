import React from "react";

const PaginationItem = ({ index, active, onClick }) => {
  return (
    <li>
      <button
        onClick={() => onClick(index)}
        className={`PaginationItem ${active ? "PaginationItem_active" : ""}`}
      >
        {index}
      </button>
    </li>
  );
};
export default PaginationItem;
