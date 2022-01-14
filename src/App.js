import "./App.css";

import React, { useState } from "react";

function UserQuery(props) {
  const { setZipList } = props;

  function onChange(event) {
    if (event.target.value.length === 5) {
      //zipcodes can only be 5 digits
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${event.target.value}`).then(
        (response) => {
          response
            .json()
            .then((data) => {
              setZipList(data);
            })
            .catch((e) => console.log(e));
        }
      );
    }
  }
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      onChange={onChange}
    ></input>
  );
}

function OutputContainer(props) {
  const { apiList } = props;
  return (
    <section>
      <ul>
        {apiList.map((i) => (
          <li>
            <dt>
              {i.LocationText}, {i.Zipcode}
            </dt>
            <dd>Population Est. {i.EstimatedPopulation}</dd>
            <dd>Latitude: {i.Lat}</dd>
            <dd>Longitude: {i.Long}</dd>
            <br />
          </li>
        ))}
      </ul>
    </section>
  );
}

function App() {
  const [zipList, setZipList] = useState([]);
  const [cityList, setCityList] = useState([]);
  return (
    <div className="App">
      <header className="App-header">
        <section id="left">
          <UserQuery placeholder="Enter ZIP Code" setZipList={setZipList} />

          <OutputContainer apiList={zipList} />
        </section>

        <section id="right">
          <UserQuery placeholder="Enter ZIP Code" setZipList={setCityList} />
          
          <OutputContainer apiList={cityList} />
        </section>
      </header>
    </div>
  );
}

export default App;
