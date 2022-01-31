import { Icon } from "@iconify/react";
import { Navigate, useNavigate } from "react-router-dom";

import bookmarkCheck from "@iconify/icons-bi/bookmark-check";
import sharpPendingActions from "@iconify/icons-ic/sharp-pending-actions";
// material
import { experimentalStyled as styled } from "@material-ui/core/styles";
import { Card, Grid } from "@material-ui/core";
import "./EventCard.css";
import axios from "axios";
// ----------------------------------------------------------------------

const CardMediaStyle = styled("div")({
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
});

const CoverImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

import { useEffect, useState } from "react";
import ConfirmModal from "./ConfirmModal";
import ReferModal from "./ReferModal";
export default function EventPostCard({
  taskID,
  title,
  points,
  image,
  isConfirm,
  done,
  doneStatus,
  setDoneStatus,
}) {
  const [openReferModal, setOpenReferModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [link, setLink] = useState();
  const handleOpenConfirmModal = () => {
    setOpenConfirmModal((prev) => !prev);
  };
  const [aiData, setDataai] = useState();
  const handlePost = () => {
    axios
      .post(`http://localhost:5000/tasks/update/${taskID}}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(async () => {
    const host = "http://localhost:5000/1490698343-tim-hortons.pdf.pdf";
    // const link = await fetch(`${host}/1490698343-tim-hortons.pdf`);
    setLink(link);
  }, [done]);
  function gotoLink() {
    console.log({ link });
    window.open(
      "http://localhost:5000/1490698343-tim-hortons.pdf.pdf",
      "_blank"
    );
  }
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard/professionals");
  };

  const handleRefer = () => {
    setOpenReferModal((prev) => !prev);
  };

  useEffect(() => {}, [doneStatus]);

  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ position: "relative" }}>
          <CardMediaStyle>
            <CoverImgStyle
              alt={title}
              src={`${image}`}
              sx={doneStatus ? { opacity: 0.5 } : { opacity: 1 }}
            />
          </CardMediaStyle>
          <div className="task-info">
            <p className="title">{title}</p>
            <p className="subtitle">
              {"Points: "}
              {points}
            </p>
            {
              <button
                onClick={isConfirm ? handleOpenConfirmModal : (taskID == 2 ? handleClick : handleRefer)}
                className="button"
                disabled={doneStatus ? true : false}
              >
                {!doneStatus ? "Resolve" : "Pending"}
              </button>
            }
            {doneStatus && title.includes("Security") && (
              <button
                className="button"
                disabled={!doneStatus ? true : false}
                onClick={gotoLink}
              >
                View
              </button>
            )}
            <></>
          </div>

          {doneStatus && (
            <div
              style={{
                width: 50,
                position: "absolute",
                top: 0,
                right: 20,
                color: "grey",
                backgroundColor: "rgba(255,255,255,0.5)",
                borderRadius: "0px 0px 10px 10px",
              }}
            >
              <Icon icon={sharpPendingActions} fontSize={50} />
            </div>
          )}

          {aiData && (
            <div style={{ padding: "12px" }}>
              <div>invoiceDate: {aiData.invoiceDate}</div>
              <div>invoicePrice: {aiData.invoicePrice}</div>
              <div>invoiceAddress: {aiData.invoiceAddress}</div>
              <div>invoiceWebsite: {aiData.invoiceWebsite}</div>
              <div>invoiceEmail: {aiData.invoiceEmail}</div>
            </div>
          )}
          {console.log(aiData)}
        </Card>
        <ConfirmModal
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title={title}
          setDoneStatus={setDoneStatus}
          taskID={taskID}
          setDataai={setDataai}
        />
        <ReferModal
          open={openReferModal}
          setOpen={setOpenReferModal}
          title={title}
          setDoneStatus={setDoneStatus}
          taskID={taskID}
        />
      </Grid>
    </>
  );
}
