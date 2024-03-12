import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"

export default function Loader() {
  return (
    <Box sx={{ display: "grid", placeContent: "center" }}>
      <CircularProgress />
    </Box>
  )
}
