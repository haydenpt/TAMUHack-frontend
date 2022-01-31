import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import UploadInvoice from "./UploadInvoice";
import { useAuth } from "src/authentication/AuthContext";

const Transition1 = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ReferModal({ open, setOpen, title, setDoneStatus }) {
  const { displayErrMess, setLoading, userProfile, isResume, setIsResume } =
    useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState();

  const host = "http://localhost:5000";

  async function updateDoneStatus() {
    const res = await fetch(
      `${host}/tasks/update/${taskID}`,
      {
        method: "POST",
      }
    );
  }


  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition1}
        keepMounted
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Next Step!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Thank you!
          </DialogContentText>
          <br />
          <UploadInvoice
            file={file}
            setFile={setFile}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setOpen(false);
            }}
            color="primary"
          >
            OKAY
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
