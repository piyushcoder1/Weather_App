

import React from 'react';
import axios from "axios";
import { useState, useEffect ,useCallback} from 'react';
import Chart from "react-apexcharts";


const Weather = () => {
  const [city, setcity] = useState("");
  const [daily, setDaily] = useState([]);
  const [weatherIcon, setWeatherIcon] = useState();
  const [weather, setWeather] = useState([]);


  const dailyData = (e) => {
    let arr = e.temp;
    console.log(e);
    setWeatherIcon(e.weather[0].icon);
    setDaily(arr);
  };


  useEffect(() => {
    axios.get("https://ipinfo.io/json?token=174ebe99b0714d").then((res) => {
      setcity(res.data.city);
    });
  }, []);

  ///data for day

  const getData = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=91dd9acfc6da1b22dec07cea91f20cc0`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      let lat = data.coord.lat;
      let lon = data.coord.lon;
      get7days(lat, lon);
    } catch (error) {
      console.log(error);
    }
  };

       ///// seven days data to fetch

  const get7days = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=91dd9acfc6da1b22dec07cea91f20cc0`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      console.log("data", data);
      setWeather(data);
    } catch (error) {
      console.log(error);
    }
  };


  /////debouncer code 


  const handleChange = (e) => {
    setcity(e.target.value);
  };

  const debouncer = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 1500);
    };
  };


  

  const optimize = useCallback(debouncer(handleChange), []);

  useEffect(() => {
    getData();
  }, [city]);

  ////loaction data


  const Livelocation = () => {
    axios.get("https://ipinfo.io/json?token=174ebe99b0714d").then((res) => {
      setcity(res.data.city);
    })
}


  return (
    <>
      <div className="Container">
        <div className="search">
          <div className="divs">
          <button className='icon' onClick={Livelocation}>
            <img src="img/location.jpg.webp" height="70%" width="60%" alt="locationimg"/>
          </button>
           {/* / <img src="img/location.jpg.webp" alt="location" /> */}
          </div>
          <div className="input">
            <input
              type="text"
              onChange={(e) => optimize(e)}
              // value={""}
              className="inputBox"
              placeholder="enter your city"
            />
          </div>
          <div className="searchIcon">
            <img src="img/search-icon.webp" alt="search icon" />
          </div>
        </div>
                  
                  {/* seven days date to fetch */}
        
        <div className="sevenDays">
          {weather.daily ? (
            weather.daily.map((el, index) => (
              <div key={index} onClick={() => dailyData(el)} tabIndex="0">
                <div className="temp">
                  <h5>{Math.floor(el.temp.min)}°C</h5>
                  <h5>{Math.floor(el.temp.max)}°C</h5>
                </div>

                <img
                  src={`https://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`}
                  alt="temprecutre logo"
                />
                <p>{el.weather[0].description}</p>
              </div>
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </div>

        {/* pressur humidity   data  */}

         <div className="pressur_humidity">
            <div>
              <h3>Pressure</h3>
              <p>1001 hpa</p>
            </div>
            <div>
              <h3>Humidity</h3>
              <p>37 %</p>
            </div>
          </div>
          <div className="pressur_humidity">
            <div>
              <h3>Sunrise</h3>
              <p>5:0 AM</p>
            </div>
            <div>
              <h3>Sunset</h3>
              <p>6:45 PM</p>
            </div>
          </div>

                   {/* graph data  */}

        <div className="graph">
          {weather.daily ? (
            <div>
              <h1>
                {Math.floor(
                  daily.max ? daily.max : weather.current.temp
                )}
                °C
              </h1>
              <img
                src={`http://openweathermap.org/img/wn/${
                  weatherIcon ? weatherIcon : weather.current.weather[0].icon
                }@2x.png`}
                alt="weather icon"
              />
              <h1 className="city_name">
                {city.length > 2 ? city : null}
              </h1>
            </div>
          ) : (
            <h1>Loading...</h1>
          )}

          <div className="Graph">
            {daily.day ? (
              <Chart
                type="area"
                series={[
                  {
                    name: "Temperature",
                    data: [
                      daily.morn,
                      daily.max,
                      daily.day,
                      daily.min,
                    ],
                  },
                ]}
                options={{
                  dataLabels: {
                    formatter: (val) => {},
                  },
                  yaxis: {
                    labels: {
                      formatter: (val) => {
                        return `${Math.floor(val)}℃`;
                      },
                    },
                  },
                  xaxis: {
                    categories: ["6:00am", "12:00pm", "6:00pm", "12:00am"],
                  },
                }}
              />
            ) : (
              <Chart
                type="area"
                series={[
                  {
                    name: "Temperature",
                    data: [15, 30, 20, 30],
                  },
                ]}
                options={{
                  dataLabels: {
                    formatter: (val) => {},
                  },
                  yaxis: {
                    labels: {
                      formatter: (val) => {
                        return `${Math.floor(val)}℃`;
                      },
                    },
                  },
                  xaxis: {
                    categories: ["6:00am", "12:00pm", "6:00pm", "12:00am"],
                  },
                }}
              />
            )}
          </div>
        </div>
              {/* google maps  */}
        <div className="mapbox">
            <iframe
          title="map"
          name="map"
          className="map"
          
          src={`https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
        ></iframe>
        </div>
      </div>
    </>
  );
}

export default Weather;
