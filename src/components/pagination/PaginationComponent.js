import React from 'react'
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import './PaginationComponentStyle.css'

const PaginationComponent = ({
  page,
  totalPages,
  onPageChange
}) => {
  return (
    <div style={{width: "fit-content", display: "flex", alignItems: "center", gap: "8px"}}>
      <button
      className='icon-arrow'
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
      <ChevronLeftIcon />
      </button>

      <span style={{fontSize: "14px", color: "#5b5f97"}}>
        {page} / {totalPages}
      </span>

      <button
      className='icon-arrow'
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRightIcon />
      </button>
    </div>
  )
}

export default PaginationComponent
