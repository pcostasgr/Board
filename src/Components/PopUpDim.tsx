import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box
} from "@mui/material";
import {
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { boardFacade } from "../store/Repository";
import { setPopUpTextTitle } from "../reducers/PopUpReducer";
import { authenticationService } from "./../Model/Users";
import { configureStore } from '@reduxjs/toolkit';
// import { AppThunk } from "../store/types";

interface PopUpDimProps {
  selectedListId: number;
  topValue: number;
  leftValue: number;
  visibility: "hidden" | "visible";
  callf: (v: string) => void;
}

const PopUpDim: React.FC<PopUpDimProps> = ({
  selectedListId,
  topValue,
  leftValue,
  visibility,
  callf
}) => {
  const dispatch = useDispatch();
  const initTextValue = useSelector((state: any) => state.popUpDisplay);

  const handleSave = () => {
    callf(initTextValue);
    dispatch(
      boardFacade.listApi.updateListApi({
        listid: selectedListId,
        listTitle: initTextValue,
        userid: -1,
        cardData: null
      }) as any
    );
  };

  const handleAddCard = () => {
    const userid = authenticationService.currentUserValue.userId;
    dispatch(
      boardFacade.cardApi.insertCardApi({
        cardid: -1,
        cardtitle: "New Card",
        listid: selectedListId,
        userid: userid,
        carddate: null,
        listItems: [],
        labelItems: []
      }) as any
    );
    callf(initTextValue);
  };

  const handleDeleteList = () => {
    dispatch(boardFacade.listApi.deleteListApi(selectedListId) as any);
    callf("");
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPopUpTextTitle(e.target.value));
  };

  if (visibility === "hidden") {
    return null;
  }

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'absolute',
        top: topValue,
        left: leftValue,
        width: 300,
        p: 2,
        zIndex: 1300
      }}
    >
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Description"
          multiline
          maxRows={10}
          value={initTextValue}
          onChange={handleTextFieldChange}
          fullWidth
          variant="outlined"
          size="small"
        />
      </Box>

      <List>
        <ListItem component="button" onClick={handleSave}>
          <ListItemIcon>
            <SaveIcon />
          </ListItemIcon>
          <ListItemText primary="Save list title" />
        </ListItem>
        
        <ListItem component="button" onClick={handleAddCard}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add card" />
        </ListItem>
        
        <Divider />
        
        <ListItem component="button" onClick={handleDeleteList}>
          <ListItemIcon>
            <DeleteIcon color="error" />
          </ListItemIcon>
          <ListItemText 
            primary="Delete list" 
            sx={{ color: 'error.main' }}
          />
        </ListItem>
      </List>
    </Paper>
  );
};

export default PopUpDim;
