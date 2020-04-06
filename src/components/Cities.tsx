import React from 'react';
import {GroupedCities} from "../api/CitiesAdapter";
import styled from "styled-components";
import {StateRow} from "./StateRow";

type GridProps = { columns: number }

const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  border: 1px solid #859899; 
  border-radius: 8px;
  padding: 16px;
  grid-gap: 16px;

`;

const CitiesContainer = styled.div`
  margin: 32px;
  text-align: center;
`;

const TotalCities = styled.div`
  margin-bottom: 16px;
`;


export const Cities = ({cities, totalCities}: { cities: GroupedCities, totalCities: number }) => {
  const citiesToDisplay = Object.entries(cities);
  const mostCitiesInState = Object.values(cities).sort((a, b) => (b.length - a.length))[0].length;
  const columns = mostCitiesInState + 1;
  return (
    <CitiesContainer>
      <TotalCities>Total cities found: {totalCities}</TotalCities>
      <Grid columns={columns}>
        {citiesToDisplay.map(([state, cities], index) => (
          <StateRow key={index} name={state} cities={cities} rowNumber={index + 1} columns={columns}/>))}
      </Grid>
    </CitiesContainer>
  )
};
