import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, TextField, Paper } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { boardFacade } from "../store/Repository";
import { authenticationService as auth } from "../Model/Users";

interface NewCardTitleLayerProps {
  listId: number;
}

const NewCardTitleLayerComp: React.FC<NewCardTitleLayerProps> = ({ listId }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const userid = auth.currentUserValue.userId;

  const createNewCard = (cardTitle: string) => {
    if (!cardTitle.trim()) return;
    
    interface CardApiPayload {
      cardid: number;
      cardtitle: string;
      listid: number;
      userid: number;
      carddate: string | null;
      listItems: any[]; // Replace `any` with a more specific type if available
      labelItems: any[]; // Replace `any` with a more specific type if available
    }

    boardFacade.cardApi.insertCardApi({
      cardid: -1,
      cardtitle: cardTitle,
      listid: listId,
      userid: userid,
      carddate: null as string | null,
      listItems: [],
      labelItems: []
    } as CardApiPayload)(dispatch); // Directly invoke the returned function with dispatch
    setTitle("");
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <Button
        fullWidth
        startIcon={<AddIcon />}
        sx={{
          justifyContent: 'flex-start',
          color: 'text.secondary',
          '&:hover': {
            backgroundColor: 'action.hover'
          }
        }}
        onClick={() => setIsExpanded(true)}
      >
        Add another card
      </Button>
    );
  }

  return (
    <Paper
      elevation={1}
      sx={{
        p: 1,
        mt: 1
      }}
    >
      <TextField
        autoFocus
        multiline
        fullWidth
        placeholder="Enter a title for this card..."
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
          onClick={() => createNewCard(title)}
        >
          Add card
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

export default NewCardTitleLayerComp;
