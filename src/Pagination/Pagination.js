import React, { useEffect } from "react";
import PaginationItem from "./PaginationItem";
import PaginationLoading from "./PaginationLoading";
import "./Pagination.css";
const Pagination = ({
  totalItmes,
  state,
  setState,
  loading,
  activedColor,
  buttonsText,
}) => {
  const isFloat = (n) => {
    return Number(n) === n && n % 1 !== 0;
  };
  const temp = totalItmes / state.take;
  const totalPages =
    totalItmes > state.take ? (isFloat(temp) ? parseInt(temp) + 1 : temp) : -1;
  const youCanGoNext = state.page < totalPages;
  const youCanGoPrev = state.page > 1;
  //===============================
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
  const onItemsClick = (index) => {
    if (state.page !== index) {
      setState({
        ...state,
        page: index,
      });
    }
  };
  useEffect(() => {
    if (activedColor) {
      document.documentElement.style.setProperty(
        "--pagination_activedColor",
        activedColor
      );
    }
  }, []);

  return (
    <div className="Pagination_wrapper">
      {totalPages !== -1 ? (
        <nav>
          <ul>
            {loading && (
              <div className="pagination_loading_wrapper">
                <PaginationLoading />
              </div>
            )}
            <li>
              <button
                disabled={youCanGoPrev ? false : true}
                onClick={prev}
                className="prev_btn"
              >
                {buttonsText?.prev ? buttonsText.prev : "Previous"}
              </button>
            </li>
            {totalPages <= 10 ? (
              new Array(totalPages)
                .fill()
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
                <span className="Pagination_seprator">.....</span>
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
                      <span className="Pagination_seprator">.....</span>
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
                {buttonsText?.next ? buttonsText.next : "Next"}
              </button>
            </li>
          </ul>
        </nav>
      ) : (
        <></>
      )}
      <div className="take_changer_wrapper">
        <button>Count</button>
        <select
          onChange={(e) => {
            setState({
              page: 1,
              take: e.target.value,
            });
          }}
          value={state.take}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};
export default Pagination;
