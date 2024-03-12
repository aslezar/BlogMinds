import * as React from "react"
import Pagination from "@mui/material/Pagination"

export default function PaginationControlled() {
  const [page, setPage] = React.useState(1)
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  return (
    <Pagination
      count={10}
      page={page}
      onChange={handleChange}
      style={{
        margin: "auto",
        width: "fit-content",
        marginTop: "2rem",
        marginBottom: "2rem",
      }}
    />
  )
}
