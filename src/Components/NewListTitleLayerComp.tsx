import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/indexStore"; // Adjusted the path to the correct location
import { Box, Button, TextField, Paper } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { boardFacade } from "../store/Repository";
import { authenticationService as auth } from "../Model/Users";

const NewListTitleLayerComp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const userid = auth.currentUserValue.userId;

  const createNewList = (listTitle: string) => {
    if (!listTitle.trim()) return;
    
    dispatch(boardFacade.listApi.insertListApi(-1, listTitle, userid));
    setTitle("");
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)'
          },
          minWidth: 272,
          justifyContent: 'flex-start'
        }}
        onClick={() => setIsExpanded(true)}
      >
        Add another list
      </Button>
    );
  }

  return (
    <Paper
      elevation={1}
      sx={{
        p: 1,
        minWidth: 272,
        backgroundColor: 'background.paper'
      }}
    >
      <TextField
        autoFocus
        fullWidth
        placeholder="Enter list title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ mb: 1 }}
      />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => createNewList(title)}
        >
          Add list
        </Button>
        <Button
          size="small"
          startIcon={<CloseIcon />}
          onClick={() => {
            setIsExpanded(false);
            setTitle("");
          }}
        >
          Cancel
        </Button>
      </Box>
    </Paper>
  );
};

export default NewListTitleLayerComp;
