

import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';

const Weather = () => {
    const [city, setCity] = useState("")
    const [day, setDays] = useState([])


       ///api data for city we search
     const SearchCity = () => {
       try{
            axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=91dd9acfc6da1b22dec07cea91f20cc0&units=metric`)
                .then((res) => {
                   // console.log(res.data)
                    // setCity(res.data)
                    weekDays(res.data.coord.lat, res.data.coord.lon)
                })
       }
       catch(error){
          console.log(error)
       }
     }

     useEffect(() =>{
      SearchCity()
     },[])
   

     /// fetc week data api
     const weekDays = (lat, lon) => {
      try {
            axios.get(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=91dd9acfc6da1b22dec07cea91f20cc0
            &units=metric`).then((response) => {
              setDays(response.data.daily)
            })
            .catch((error) => {
              console.log(error)
            })
      }
      catch{}
     }

     const Livelocation = () => {
         axios.get("https://ipinfo.io/json?token=174ebe99b0714d").then((res) => {
          setCity(res.data.city);
         })
     }

     

    return (
        <div className='container'>
        <h4>Weather App</h4>
        <div className='searchbox'>
          <button className='icon' onClick={Livelocation}>
            <img src="img/location.jpg.webp" alt="locationimg"/>
          </button>

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
        </div>
    );
}

export default Weather;
