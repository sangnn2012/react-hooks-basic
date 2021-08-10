import React from "react";
import PropTypes from "prop-types";

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
  pagination: null,
  onPageChange: null,
};

function Pagination(props) {
  const { pagination, onPageChange } = props;
  const { _page, _limit, _totalRows } = pagination;

  function handlePageChange(newPage) {
    if (onPageChange) {
      onPageChange(newPage);
    }
  }

  return (
    <div>
      <button className="prev" disabled={_page <= 1} onClick={() => handlePageChange(_page - 1)}>
        Previous
      </button>
      current page: {_page}
      <button className="next" disabled={_page >= Math.ceil(_totalRows/_limit)} onClick={() => handlePageChange(_page + 1)}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
