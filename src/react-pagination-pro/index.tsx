import React, { useMemo } from 'react';
import './pagination.scss';
import PaginationItem from './PaginationItem';
interface stateType {
  page: number;
  take: number;
}
type Props = {
  totalItmes: number;
  state: stateType;
  setState: ({ page, take }: stateType) => void;
  parentClassName?: string;
  prevButtonText?: string;
  nextButtonText?: string;
  showTakeChanger?: boolean;
  takeChangerCounts?: Array<number | string>;
  takeChangerText?: string;
};
export default function Pagination({
  totalItmes,
  state,
  setState,
  parentClassName,
  prevButtonText = 'Previous',
  nextButtonText = 'Next',
  showTakeChanger = true,
  takeChangerCounts = [5, 10, 15, 20],
  takeChangerText = 'Rows :',
}: Props) {
  const isFloat = (n: number) => {
    return Number(n) === n && n % 1 !== 0;
  };
  const temp = useMemo(() => totalItmes / state.take, [totalItmes, state.take]);
  const totalPages = useMemo(
    () => (totalItmes > state.take ? (isFloat(temp) ? ~~temp + 1 : temp) : -1),
    [totalItmes, temp, state.take]
  );
  const youCanGoNext = useMemo(() => state.page < totalPages, [
    state.page,
    totalPages,
  ]);
  const youCanGoPrev = useMemo(() => state.page > 1, [state.page]);
  const next = () => {
    if (youCanGoNext) {
      setState({
        ...state,
        page: state.page + 1,
      });
    }
  };
  const prev = () => {
    if (youCanGoPrev) {
      setState({
        ...state,
        page: state.page - 1,
      });
    }
  };
  const onItemsClick = (index: number) => {
    if (state.page !== index) {
      setState({
        ...state,
        page: index,
      });
    }
  };
  return (
    <div className={`react_pagination_wrapper ${parentClassName ?? ''}`}>
      {totalPages !== -1 ? (
        <nav>
          <ul>
            <li>
              <button
                disabled={youCanGoPrev ? false : true}
                onClick={prev}
                className="prev_btn"
              >
                {prevButtonText}
              </button>
            </li>
            {totalPages <= 10 ? (
              new Array(totalPages)
                .fill('')
                .map((_, index) => (
                  <PaginationItem
                    index={index + 1}
                    key={index}
                    active={state.page === index + 1}
                    onClick={onItemsClick}
                  />
                ))
            ) : (
              <>
                <PaginationItem
                  index={1}
                  active={state.page === 1}
                  onClick={onItemsClick}
                />
                <PaginationItem
                  index={2}
                  active={state.page === 2}
                  onClick={onItemsClick}
                />
                <PaginationItem
                  index={3}
                  active={state.page === 3}
                  onClick={onItemsClick}
                />
                <span className="Pagination_seprator">...</span>
                {state.page > 3 && state.page < totalPages - 2 ? (
                  <>
                    <PaginationItem
                      index={state.page}
                      active={true}
                      onClick={onItemsClick}
                    />
                    {state.page + 2 <= totalPages - 2 && (
                      <PaginationItem
                        index={state.page + 1}
                        active={false}
                        onClick={onItemsClick}
                      />
                    )}
                    {state.page + 2 <= totalPages - 3 && (
                      <PaginationItem
                        index={state.page + 2}
                        active={false}
                        onClick={onItemsClick}
                      />
                    )}
                    {state.page !== totalPages - 3 && (
                      <span className="Pagination_seprator">...</span>
                    )}
                  </>
                ) : (
                  <></>
                )}
                <PaginationItem
                  index={totalPages - 2}
                  active={state.page === totalPages - 2}
                  onClick={onItemsClick}
                />
                <PaginationItem
                  index={totalPages - 1}
                  active={state.page === totalPages - 1}
                  onClick={onItemsClick}
                />
                <PaginationItem
                  index={totalPages}
                  active={state.page === totalPages}
                  onClick={onItemsClick}
                />
              </>
            )}
            <li>
              <button
                disabled={youCanGoNext ? false : true}
                className="next_btn"
                onClick={next}
              >
                {nextButtonText}
              </button>
            </li>
          </ul>
        </nav>
      ) : (
        <></>
      )}
      {showTakeChanger && (
        <div className="take_changer_wrapper">
          <div>{takeChangerText}</div>
          <select
            onChange={e => {
              setState({
                page: 1,
                take: +e.target.value,
              });
            }}
            value={state.take}
          >
            {takeChangerCounts.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
