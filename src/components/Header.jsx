import React, { useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export const Header = (props) => {
  const { setUser } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const postCollectionRef = collection(db, "posts");

  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title,
      content,
      mobile: window.user.phoneNumber,
      name: window.user.displayName,
      createdAt: new Date(),
    });
  };

  return (
    <>
      <AppBar sx={{ backgroundColor: "green" }}>
        <Container sx={{ padding: 0, margin: 0, maxWidth: 0 }}>
          <Box
            display="flex"
            flexDirection="row"
            height="10vh"
            width="100%"
            justifyContent="space-between"
          >
            <Box display="flex" flexDirection="row">
              <img src="/dailyblog.png" alt="logo" width="24px" height="24px" />
              <h1>Blog Post</h1>
              <Button
                sx={{ color: "white" }}
                onClick={() => setOpenModal(true)}
              >
                Create New
              </Button>
            </Box>
            <Box display="flex" flexDirection="row">
              <Button
                sx={{ color: "white" }}
                onClick={() => {
                  window.localStorage.removeItem("user");
                  setUser(null);
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Container>
      </AppBar>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        fullWidth
        maxWidth="md"
        sx={{ margin: "4rem" }}
      >
        <DialogTitle>
          <Box width="100%">
            <TextField
              value={title}
              sx={{ margin: "1rem", width: "95%" }}
              color="success"
              label="Enter title"
              onChange={(event) => setTitle(event.target.value)}
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          <TextField
            value={content}
            sx={{ margin: "1rem", width: "95%" }}
            color="success"
            multiline
            label="Enter blog content"
            rows={9}
            onChange={(event) => setContent(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              createPost();
              setOpenModal(false);
            }}
            variant="contained"
            color="success"
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
