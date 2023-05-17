import React from 'react';
type Props = {
  index: number;
  active: boolean;
  onClick: (index: number) => void;
};
const PaginationItem = ({ index, active, onClick }: Props) => {
  return (
    <li
      onClick={() => onClick(index)}
      className={`PaginationItem ${active ? 'active' : ''}`}
    >
      {index}
    </li>
  );
};
export default PaginationItem;
