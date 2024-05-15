import { confirmable, createConfirmation } from "react-confirm"

import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

interface ConfirmationBoxProps {
  show: boolean
  proceed: (value: boolean) => void
  confirmation: string
  options: {
    title: string
    deleteButton?: string
    cancelButton?: string
  }
}

const ConfirmationBox = ({
  show,
  proceed,
  confirmation,
  options,
}: ConfirmationBoxProps) => {
  console.log("ConfirmationBox", show, proceed, confirmation, options)

  const handleProceed = () => {
    proceed(true)
  }

  const handleClose = () => {
    proceed(false)
  }

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      aria-labelledby={options.title}
      aria-describedby={confirmation}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "16px",
          padding: "10px",
          backgroundColor: "#f5f5f5",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}
      >
        {options.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ fontSize: "1.2rem", color: "#555" }}
        >
          {confirmation}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          {options.cancelButton || "Disagree"}
        </Button>
        <Button onClick={handleProceed} autoFocus>
          {options.deleteButton || "Agree"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const confirmMain = createConfirmation(confirmable(ConfirmationBox))

export default function confirm(
  confirmation: string,
  options: ConfirmationBoxProps["options"] = {},
) {
  return confirmMain({ confirmation, options })
}
