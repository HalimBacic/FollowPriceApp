import React from 'react'

const PaginationComponent = ({
  page,
  totalPages,
  onPageChange
}) => {
  return (
    <div>
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>

      <span>
        Page {page} / {totalPages}
      </span>

      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  )
}

export default PaginationComponent
