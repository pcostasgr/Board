import React from "react";
import { useSelector } from "react-redux";
import { Box, Stack } from "@mui/material";
import * as m from "../Model/ListModel";

interface CardColorLabelRowsProps {
  cardId: number;
  listData: m.LabelItem[];
}

const selectCardLabelItems = (state: m.LabelItem[], cardId: number) => {
  return state.filter(elem => elem.cardid === cardId);
};

const CardColorLabelRows: React.FC<CardColorLabelRowsProps> = ({ cardId }) => {
  const listData = useSelector((state: any) => 
    selectCardLabelItems(state.labelItemsDisplay, cardId)
  );

  if (!listData?.length) {
    return null;
  }

  const ELEMENTS_PER_ROW = 5;
  const rowCount = Math.ceil(listData.length / ELEMENTS_PER_ROW);

  return (
    <Stack spacing={0.5}>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <Box
          key={`row-${rowIndex}`}
          sx={{
            display: 'flex',
            gap: 0.5
          }}
        >
          {listData
            .slice(
              rowIndex * ELEMENTS_PER_ROW,
              (rowIndex + 1) * ELEMENTS_PER_ROW
            )
            .map(elem => (
              <Box
                key={elem.labelitemid}
                sx={{
                  backgroundColor: elem.color,
                  width: elem.width,
                  height: elem.height,
                  borderRadius: '2px'
                }}
              />
            ))}
        </Box>
      ))}
    </Stack>
  );
};

export default CardColorLabelRows;
