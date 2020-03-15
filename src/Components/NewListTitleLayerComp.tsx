import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { boardFacade } from "../store/Repository";
import { authenticationService as auth } from "../Model/Users";


const NewListTitleLayerComp = () => {
  const listId=1;

  const buttonId = "NCBListId" + listId;

  const userid = auth.currentUserValue.userId;

  const dispatch = useDispatch();

  const [buttonVisible, setButtonVisible] = useState(true);

  const [title, setTitle] = useState("");

  const useButtonStyle = makeStyles({
    label: {
      textTransform: "none"
    },
    initButton:{
      color: "white",
      background:"#0a9bf5",
      textTransform: "none"
    },
    saveButton: {
      background: "green",
      color: "white"
    },
    textField:{
      background:"#87cefa",
      color:"white"
    }
  });

  const classes = useButtonStyle();

  const createNewList = (listTitle: string) => {
    const user=auth.currentUserValue;
    dispatch(boardFacade.listApi.insertListApi(-1,listTitle,user.userId));
  };

  const renderButton = (): any => {
    return (
      <div id={"Div" + buttonId} style={{ position:"relative",width:"300px" }} >
        <Button
          id={buttonId}
          variant="text"
          fullWidth={true}
          classes={{
            label: classes.initButton
          }}
          onClick={(event: any) => {
            setButtonVisible(false);
          }}
        >
          + Add another list
        </Button>
      </div>
    );
  };

  const renderInputText = (): any => {
    return (
      <table id={"Tab" + buttonId}>
        <tbody>
          <colgroup>
            <col width="300px" />
          </colgroup>
          <tr>
            <td>
              <TextField
                id={"textArea" + buttonId}
                rows={1}
                classes={{
                  root:classes.textField
                }}
                fullWidth={true}
                onChange={(event: any) => {
                  setTitle(event.target.value);
                }}
              ></TextField>
            </td>
          </tr>
          <tr>
            <td>
              <Button
                id={"SB" + buttonId}
                variant="text"
                classes={{
                  root: classes.saveButton,
                  label: classes.label
                }}
                size="small"
                onClick={(event: any) => {
                  createNewList(title);
                  setButtonVisible(true);
                }}
              >
                Save
              </Button>
              <Button
                id={"EB" + buttonId}
                variant="text"
                size="small"
                classes={{
                  label: classes.label
                }}
                onClick={(event: any) => {
                  setButtonVisible(true);
                }}
              >
                X
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const renderControl = (): any => {
    if (buttonVisible) {
      return renderButton();
    } else {
      return renderInputText();
    }
  };

  return renderControl();
};

export default NewListTitleLayerComp;
