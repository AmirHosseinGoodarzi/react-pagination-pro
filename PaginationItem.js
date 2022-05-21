import React from "react";

const PaginationItem = ({
  index,
  active,
  onClick,
  activeClassName,
  pageItemsClassName,
}) => {
  return (
    <li>
      <button
        onClick={() => onClick(index)}
        className={`PaginationItem ${pageItemsClassName?pageItemsClassName:""} ${
          active
            ? `PaginationItem_active ${activeClassName ? activeClassName : ""}`
            : ""
        }`}
      >
        {index}
      </button>
    </li>
  );
};
export default PaginationItem;
