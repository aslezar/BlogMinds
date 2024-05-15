import {
  confirmable,
  createConfirmation,
  ConfirmDialogProps,
} from "react-confirm"

import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

interface ConfirmationBoxProps {
  confirmation: string
  title?: string
  deleteButton?: string
  cancelButton?: string
}

const ConfirmationBox: React.FC<
  ConfirmDialogProps<ConfirmationBoxProps, boolean>
> = ({ show, proceed, confirmation, title, deleteButton, cancelButton }) => {
  console.log(confirmation, title, deleteButton, cancelButton)

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
      aria-labelledby={title || "alert-dialog-title"}
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
        {title || "Confirmation"}
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
        <Button onClick={handleClose}>{cancelButton || "Disagree"}</Button>
        <Button onClick={handleProceed} autoFocus>
          {deleteButton || "Agree"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const confirmableConfirmationBox = confirmable(ConfirmationBox)

const confirmMain = createConfirmation(confirmableConfirmationBox)

export default function confirm(
  confirmation: string,
  options: {
    title?: string
    deleteButton?: string
    cancelButton?: string
  },
) {
  return confirmMain({
    confirmation,
    ...options,
  })
}
