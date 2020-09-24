import React, { useState, useEffect } from 'react';
import axios from 'axios';

import StateProvider from './contextState';
import './App.scss';
import Days from './components/Days';
import reducer from './reducers';

const App = props => {
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const result = await axios('data.json');
      setData(result.data);
    } catch (err) {
      console.log(`could not load data, failed with ${err}`);
    }
  }

  useEffect(
    () => {
      fetchData();
    }, []);

  return (
    <>
      {data ? (
        <StateProvider initialState={data} reducer={reducer}>
          <div className="admin-container">
            <header className="admin-header">
              <h1>Menu Editor</h1>
              <a href="http://localhost:7000/preview" target="blank" className={"btn-preview"}>preview</a>
            </header>
            <Days />
          </div>
        </StateProvider>
      ) :
        <div className="preloader">
          <div className="lds-roller"></div>
        </div>
      }
    </>
  )
}


export default App;
