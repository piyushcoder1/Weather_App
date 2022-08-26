

import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';

const Weather = () => {
    const [city, setCity] = useState("")

    //  const SearchCity = () => {
    //    try{
    //         axios.get(
    //             `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=91dd9acfc6da1b22dec07cea91f20cc0&units=metric`)
    //             .then((res) => {
    //                 console.log(res.data)
    //             })
    //    }
    //    catch(error){
    //       console.log(error)
    //    }
    //  }

    return (
        <>
        <h4>Weather App</h4>
        <div>
        <input type="text"
         placeholder='Searching'
         className='input'
         value={city}
           onChange={(e) => {
            setCity(e.target.value);
           }}
         />
            <button className='Searching' onClick={SearchCity}>
             Search
            </button>
        </div>
            <div className="mapbox">
            <iframe
          title="map"
          name="map"
          className="map"
          src={`https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
        ></iframe>
        </div>
        </>
    );
}

export default Weather;
