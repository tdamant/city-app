import React, {useState} from 'react';
import './App.css';
import Search from "./components/search";
import LoadingSpinner from "./components/loadingSpinner";
import {connect} from "react-redux";
import {updateCities} from "./store/cities/actions";
import styled from "styled-components";
import {RootState} from "./store";
import {Cities} from "./components/Cities";
import {City} from "./store/cities/types";
import {CitiesAdapter} from "./api/CitiesAdapter";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 32px;
`;

const NoResults = styled.div`
  padding: 32px;
  font-size: 16px;
`;


const App = ({updateCitiesFn, cities}: {updateCitiesFn: typeof updateCities, cities: City[] | undefined}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const groupedCities = new CitiesAdapter().groupByState(cities || []);
  return (
    <Layout>
      <Search updateCities={updateCitiesFn} setLoading={setIsLoading} setHasSearched={setHasSearched}/>
      {(cities && cities.length && !isLoading) ? (<Cities cities={groupedCities} totalCities={cities.length}/>) : null}
      {(hasSearched && (cities && !cities.length)) ?
        <NoResults>No cities found try again with a different search</NoResults>
        : null}
      {isLoading && (
        <LoadingSpinner/>
      )}
    </Layout>
  );
};

const dispatchProps = {
  updateCitiesFn: updateCities
};
const mapStateToProps = (state: RootState) => (
  {
    cities: state.cities
  });

export default connect(mapStateToProps, dispatchProps)(App);
