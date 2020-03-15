import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { boardFacade } from "../store/Repository";
import { authenticationService as auth } from "../Model/Users";
import { render } from "react-dom";

type NewCardTitleLayerProps = {
  listId: number;
};

const NewCardTitleLayerComp = (props: NewCardTitleLayerProps) => {
  const { listId } = props;

  const buttonId = "NCBListId" + listId;

  const userid = auth.currentUserValue.userId;

  const dispatch = useDispatch();

  const [buttonVisible, setButtonVisible] = useState(true);

  const [title, setTitle] = useState("");

  const useButtonStyle = makeStyles({
    label: {
      textTransform: "none"
    },
    root: {
      background: "green",
      color: "white"
    },
  });

  const classes = useButtonStyle();

  const createNewCard = (cardTitle: string) => {
    dispatch(
      boardFacade.cardApi.insertCardApi({
        cardid: -1,
        cardtitle: cardTitle,
        listid: listId,
        userid: userid,
        carddate: null,
        listItems: [],
        labelItems: []
      })
    );
  };

  const renderButton = (): any => {
    return (
     
        <Button
          id={buttonId}
          variant="text"
          fullWidth={true}
          classes={{
            label: classes.label
          }}
          onClick={(event: any) => {
            setButtonVisible(false);
          }}
        >
          + Add another card
        </Button>
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
                rows={2}
                multiline={true}
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
                  root: classes.root,
                  label: classes.label
                }}
                size="small"
                onClick={(event: any) => {
                  createNewCard(title);
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
    const comp=buttonVisible?renderButton():renderInputText();
    return  <div id={"Div" + buttonId} style={{ position:"absolute" }} >{comp}</div>
  };

  return renderControl();
};

export default NewCardTitleLayerComp;
