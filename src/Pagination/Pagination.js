import React from "react";
import PaginationItem from "./PaginationItem";
import PaginationLoading from "./PaginationLoading";
import "./Pagination.css";
const Pagination = ({
  totalItmes,
  state,
  setState,
  loading,
  activeClassName,
  pageItemsClassName,
  buttonsClassName,
  buttonsText,
  showTakeChanger,
  takeChangerCounts,
  takeChangerClassName,
  takeChangerText,
}) => {
  const propsIsValid = () => {
    let isValid = true;
    if (!state?.take || !state?.page || !setState || !totalItmes) {
      isValid = false;
    }
    return isValid;
  };
  const isFloat = (n) => {
    return Number(n) === n && n % 1 !== 0;
  };
  let totalPages = -1,
    youCanGoNext = false,
    youCanGoPrev = false;
  if (propsIsValid) {
    const temp = totalItmes / state?.take;
    totalPages =
      totalItmes > state?.take
        ? isFloat(temp)
          ? parseInt(temp) + 1
          : temp
        : -1;
    youCanGoNext = state?.page < totalPages;
    youCanGoPrev = state?.page > 1;
  }
  //===============================
  const next = () => {
    if (youCanGoNext) {
      setState({
        ...state,
        page: state?.page + 1,
      });
    }
  };
  const prev = () => {
    if (youCanGoPrev) {
      setState({
        ...state,
        page: state?.page - 1,
      });
    }
  };
  const onItemsClick = (index) => {
    if (state?.page !== index) {
      setState({
        ...state,
        page: index,
      });
    }
  };
  return (
    <div className="Pagination_wrapper">
      {propsIsValid() ? (
        <>
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
                    className={`prev_btn ${
                      buttonsClassName ? buttonsClassName : ""
                    }`}
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
                        active={state?.page === index + 1}
                        activeClassName={activeClassName}
                        pageItemsClassName={pageItemsClassName}
                        onClick={onItemsClick}
                      />
                    ))
                ) : (
                  <>
                    <PaginationItem
                      index={1}
                      active={state?.page === 1}
                      activeClassName={activeClassName}
                      pageItemsClassName={pageItemsClassName}
                      onClick={onItemsClick}
                    />
                    <PaginationItem
                      index={2}
                      active={state?.page === 2}
                      activeClassName={activeClassName}
                      pageItemsClassName={pageItemsClassName}
                      onClick={onItemsClick}
                    />
                    <PaginationItem
                      index={3}
                      active={state?.page === 3}
                      activeClassName={activeClassName}
                      pageItemsClassName={pageItemsClassName}
                      onClick={onItemsClick}
                    />
                    <span className="Pagination_seprator">...</span>
                    {state?.page > 3 && state?.page < totalPages - 2 ? (
                      <>
                        <PaginationItem
                          index={state?.page}
                          active={true}
                          activeClassName={activeClassName}
                          pageItemsClassName={pageItemsClassName}
                          onClick={onItemsClick}
                        />
                        {state?.page + 2 <= totalPages - 2 && (
                          <PaginationItem
                            index={state?.page + 1}
                            active={false}
                            onClick={onItemsClick}
                            pageItemsClassName={pageItemsClassName}
                          />
                        )}
                        {state?.page + 2 <= totalPages - 3 && (
                          <PaginationItem
                            index={state?.page + 2}
                            active={false}
                            onClick={onItemsClick}
                            pageItemsClassName={pageItemsClassName}
                          />
                        )}
                        {state?.page !== totalPages - 3 && (
                          <span className="Pagination_seprator">...</span>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                    <PaginationItem
                      index={totalPages - 2}
                      active={state?.page === totalPages - 2}
                      activeClassName={activeClassName}
                      pageItemsClassName={pageItemsClassName}
                      onClick={onItemsClick}
                    />
                    <PaginationItem
                      index={totalPages - 1}
                      active={state?.page === totalPages - 1}
                      activeClassName={activeClassName}
                      pageItemsClassName={pageItemsClassName}
                      onClick={onItemsClick}
                    />
                    <PaginationItem
                      index={totalPages}
                      active={state?.page === totalPages}
                      activeClassName={activeClassName}
                      pageItemsClassName={pageItemsClassName}
                      onClick={onItemsClick}
                    />
                  </>
                )}
                <li>
                  <button
                    disabled={youCanGoNext ? false : true}
                    className={`next_btn ${
                      buttonsClassName ? buttonsClassName : ""
                    }`}
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
          {(showTakeChanger === undefined || showTakeChanger) && (
            <div
              className={`take_changer_wrapper ${
                takeChangerClassName ? takeChangerClassName : ""
              }`}
            >
              <div>{takeChangerText ? takeChangerText : "Rows :"}</div>
              <select
                onChange={(e) => {
                  setState({
                    page: 1,
                    take: e.target.value,
                  });
                }}
                value={state?.take}
              >
                {takeChangerCounts && takeChangerCounts?.length > 0 ? (
                  takeChangerCounts.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))
                ) : (
                  <>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                  </>
                )}
              </select>
            </div>
          )}
        </>
      ) : (
        <p id="inValidPropsError">
          Error : Please write valid required props for pagination.
        </p>
      )}
    </div>
  );
};
export default Pagination;
