import "./App.css";

import React, { useState } from "react";

function UserQuery(props) {
  const { setApiList } = props;

  function onChange(event) {
    if (event.target.value.length === 5) {
      //zipcodes can only be 5 digits
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${event.target.value}`).then(
        (response) => {
          response
            .json()
            .then((data) => {
              setApiList(data);
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
  const [apiList, setApiList] = useState([]);
  return (
    <div className="App">
      <header className="App-header">
        <UserQuery placeholder="Enter ZIP Code" setApiList={setApiList} />

        <OutputContainer apiList={apiList} />
      </header>
    </div>
  );
}

export default App;
