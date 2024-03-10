import React from "react"
import SpeedDial from "@mui/material/SpeedDial"
import SpeedDialIcon from "@mui/material/SpeedDialIcon"
import SpeedDialAction from "@mui/material/SpeedDialAction"
import PlusIcon from "@mui/icons-material/Add"
import MessageIcon from "@mui/icons-material/Message"
import { useTheme } from "@mui/material/styles"
import { useNavigate } from "react-router-dom"

export default function SpeedDialComponent() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const navigate = useNavigate()

  return (
    <SpeedDial
      ariaLabel="SpeedDial example"
      icon={<SpeedDialIcon />}
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      direction="up" // Change the direction as needed (up, down, left, right)
      sx={{
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      }} // Set the initial position
    >
      <SpeedDialAction
        key="Plus"
        icon={<PlusIcon />}
        tooltipTitle="Add blog"
        onClick={() => navigate("/addblog")}
      />
      <SpeedDialAction
        key="Message"
        icon={<MessageIcon />}
        tooltipTitle="Contact US"
        onClick={() => navigate("/contactus")}
      />
    </SpeedDial>
  )
}
