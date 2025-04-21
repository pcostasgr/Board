import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CardCheckList, CardCheckListItem } from "../Model/ListModel";
import { authenticationService } from "../Model/Users";
import { boardFacade } from "../store/Repository";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

type CardCheckListCompProps = {
  cardid: number;
  lists: CardCheckList[];
  loadDataEvent: (cardId: number) => void;
  insertItemEvent: (checkListItem: CardCheckListItem) => void;
  deleteItemEvent: (checkListItem: CardCheckListItem) => void;
  updateItemEvent: (checkListItem: CardCheckListItem) => void;
  insertListEvent: (checkList: CardCheckList) => void;
  deleteListEvent: (checkListId: number) => void;
  updateListEvent: (checkList: CardCheckList) => void;
};
const useStyles = makeStyles({
  label: {
    textTransform: "capitalize",
  },
});

const CardCheckListComp = (props: CardCheckListCompProps) => {
  const classes = useStyles();
  const {
    cardid,
    loadDataEvent,
    insertItemEvent,
    deleteItemEvent,
    updateItemEvent,
    insertListEvent,
    deleteListEvent,
    updateListEvent
  } = props;

  useEffect(() => {
    //console.log("Load Card Id :"+ cardid);
    loadDataEvent(cardid);
  }, []);

  const StyledButton = styled(Button)({
    textTransform: "capitalize"
  });

  const listData = props.lists?.map((listElem: CardCheckList) => {
    const key_: string = "_" + cardid + "_" + listElem.checklistid + "_";

    const itemRows = listElem.items
      ? listElem.items.map((elem: CardCheckListItem) => {
          if (elem == null) {
            return null;
          }
          return (
            <React.Fragment key={"ReactFrag" + key_ + elem.clitemid}>
              <tr id={"tr_" + key_ + elem.clitemid}>
                <td>
                  <div
                    id={"divItem" + key_ + elem.clitemid}
                    className="card-list-details-horizontal"
                  >
                    <div>
                      <input
                        type="checkbox"
                        className="largeCheckbox"
                        id={"item" + key_ + elem.clitemid}
                        onChange={(event: any) => {
                          var elem_ = {
                            ...elem,
                            ischecked: event.target.checked
                          };
                          updateItemEvent(elem_);
                        }}
                        checked={elem.ischecked}
                        value={elem.clitemid}
                      ></input>
                    </div>
                    <div>
                      <TextField
                        id={"textArea" + key_ + elem.clitemid}
                        rows={1}
                        fullWidth={true}
                        defaultValue={elem.itemtitle}
                        onChange={(event: any) => {
                          console.log("textfield value:" + event.target.value);
                          var elem_ = {
                            ...elem,
                            itemtitle: event.target.value,
                            cardid: cardid
                          };
                          updateItemEvent(elem_);
                        }}
                      ></TextField>
                    </div>
                    <div>
                      <Button
                        id={"button" + key_ + elem.clitemid}
                        variant="text"
                        size="large"
                        className=""
                        onClick={(event: any) => {
                          deleteItemEvent(elem);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>
            </React.Fragment>
          );
        })
      : [];

    const userid = authenticationService.currentUserValue.userId;

    return (
      <React.Fragment key={"ReactFragTable" + key_}>
        <div id={"ChackListDiv" + key_}>
          <table id={"table" + key_}>
            <tbody>
              <tr>
                <td>
                  <TextField
                    id={"ListtextArea" + key_}
                    rows={1}
                    fullWidth={true}
                    defaultValue={listElem.title}
                    onChange={(event: any) => {
                      var elem_ = { ...listElem, title: event.target.value };
                      updateListEvent(elem_);
                    }}
                  ></TextField>
                </td>
              </tr>
              <tr>
                <Button
                  variant="text"
                  className={classes.label}
                  onClick={() => {
                    insertItemEvent({
                      clitemid: -1,
                      itemtitle: "New List Item",
                      ischecked: false,
                      userid: userid,
                      checklistid: listElem.checklistid
                    });
                  }}
                >
                  Add item
                </Button>

                <Button
                  variant="text"
                  className={classes.label}
                  onClick={() => {
                    deleteListEvent(listElem.checklistid);
                  }}
                >
                  Delete list
                </Button>
              </tr>
              {itemRows}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  });

  return (
    <div>
      <Button
        variant="text"
        className={classes.label}
        onClick={event => {
          insertListEvent({
            cardid: cardid,
            checklistid: -1,
            title: "New List",
            userid: authenticationService.currentUserValue.userId,
            items: []
          });
        }}
      >
        Create New List
      </Button>
      <br></br>
      {listData}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    lists: state.cardListDisplay
  };
};

function mapDispatchToProps(dispatch: any) {
  return {
    loadDataEvent: (cardId: number) => {
      dispatch(boardFacade.checkListApi.getByCardId(cardId));
    },
    insertItemEvent: (checkListItem: CardCheckListItem) => {
      dispatch(boardFacade.checkListApi.insertCheckListItem(checkListItem));
    },
    deleteItemEvent: (checkListItem: CardCheckListItem) => {
      dispatch(boardFacade.checkListApi.deleteCheckListItem(checkListItem));
    },
    updateItemEvent: (checkListItem: CardCheckListItem) => {
      dispatch(boardFacade.checkListApi.updateCheckListItem(checkListItem));
    },
    insertListEvent: (checkList: CardCheckList) => {
      dispatch(boardFacade.checkListApi.insertCheckList(checkList));
    },
    deleteListEvent: (checkListId: number) => {
      dispatch(boardFacade.checkListApi.deleteCheckList(checkListId));
    },
    updateListEvent: (checkList: CardCheckList) => {
      dispatch(boardFacade.checkListApi.updateCheckList(checkList));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardCheckListComp);
