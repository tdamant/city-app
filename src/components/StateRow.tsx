import styled from "styled-components";
import React, {Fragment} from "react";

const GridCell = styled.div<{ rowNumber: number }>`
  grid-row: ${props => props.rowNumber};
`;

export const StateRow = ({name, cities, rowNumber, columns}: { name: string, cities: string[], rowNumber: number, columns: number }) => {
  return (
    <Fragment>
      <GridCell rowNumber={rowNumber}>
        {name}
      </GridCell>
      {cities.map((city) => (<GridCell rowNumber={rowNumber}>{city}</GridCell>))}
    </Fragment>
  )
};
