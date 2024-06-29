import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ({ notificationProps, setnotificationProps }) {
  let navigate = useNavigate();
  const handleClose = () => {
    setnotificationProps({ ...notificationProps, modal: false });
  };

  return (
    <Dialog
      open={notificationProps?.modal}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          backgroundColor: "#EAEAED",
          border: "1px solid #DBB85C",
          padding: "30px",
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          textAlign: "center",
          color: notificationProps?.error ? "#FF0101" : "#1ed404",
        }}
        variant="h3"
        lineHeight="2rem"
        fontSize="24px"
      >
        {notificationProps?.error
          ? "Operation Failed!"
          : "Congratulations! Success!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          style={{ textAlign: "center" }}
        >
          <Typography variant="h4" py={3} color="black" fontSize="18px">
            {notificationProps?.message}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        {notificationProps?.error ? (
          <Button
            sx={{
              fontWeight: 400,
              textTransform: "capitalize",
              backgroundColor: "#FF0101",
              color: "#ffffff",
              fontSize: "16px",
              fontFamily: ["Russo One", "sans-serif", "sans-serif"].join(","),
              borderRadius: "47px",
              width: "331px",
              height: "39px",
              boxShadow: "0px 4px 19px rgba(0, 0, 0, 0.65)",
              "&:hover": {
                backgroundColor: "#FF0101a1",
              },
            }}
            onClick={handleClose}
            pt={3}
          >
            Try Again
          </Button>
        ) : (
          notificationProps?.buttonTitle && (
            <Button
              sx={{
                fontWeight: 400,
                textTransform: "capitalize",
                backgroundColor: "#1ed404",
                color: "#ffffff",
                fontSize: "16px",
                fontFamily: ["Russo One", "sans-serif", "sans-serif"].join(","),
                borderRadius: "47px",
                width: "331px",
                height: "39px",
                boxShadow: "0px 4px 19px rgba(0, 0, 0, 0.65)",
                "&:hover": {
                  backgroundColor: "#1ed404a1",
                },
              }}
              onClick={() => {
                navigate(notificationProps?.redirect);
                handleClose();
              }}
              pt={3}
            >
              {notificationProps?.buttonTitle}
            </Button>
          )
        )}
      </DialogActions>
    </Dialog>
  );
}
