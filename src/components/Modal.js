import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    dispatch,
    id,
    showButton,
    header,
    excerpt,
    action,
    actionButton,
    dblClick,
    click,
    styles,
  } = props;

  return (
    <div>
      <Button
        sx={styles}
        onClick={dblClick ? () => click() : handleOpen}
        onDoubleClick={dblClick && handleOpen}
      >
        {showButton}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {header}
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {excerpt}
          </Typography>
          <br />
          <Button
            style={{
              float: "right",
              backgroundColor: "rgba(206, 206, 206, 0.359)",
            }}
            onClick={() => action && action(dispatch && dispatch, id && id)}
          >
            {actionButton}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
