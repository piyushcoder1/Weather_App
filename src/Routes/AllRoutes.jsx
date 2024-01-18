import React from "react";
import {Routes, Route} from "react-router-dom";
import Weather from "../components/weather";


const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Weather/>}></Route>
        </Routes>
    )
}
export default AllRoutes