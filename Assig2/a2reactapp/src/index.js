import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegionList from "./components/RegionList";
import CountryList from "./components/CountryList";
import CountryEmissionData from "./components/CountryEmissionData";
import CountryTemperatureData from "./components/CountryTemperatureData";
import CitySearchAndData from "./components/CitySearchAndData";
import CityAirQualityData from "./components/CityAirQualityData";
import Home from './routes/Home';
import Contact from './routes/Contact';
//import CardDetail from './components/CardDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="" element={<Home />} /> {/*route when URL is localhost:[port], order matters */}
                    <Route path="Home" element={<Home />} />
                    <Route path="Contact" element={<Contact />} />
                    <Route path="RegionList" element={<RegionList />} />
                    <Route path="CountryList" element={<CountryList />} />
                    <Route path="CountryList/:regionId" element={<CountryList />} />
                    <Route path="CountryEmissionData/:regionId/:countryId" element={<CountryEmissionData />} />
                    <Route path="CountryTemperatureData/:regionId/:countryId" element={<CountryTemperatureData />} />
                    <Route path="CitySearchAndData/:regionId/:countryId" element={<CitySearchAndData />} />
                    <Route path="CityAirQualityData/:regionId/:countryId/:cityId" element={<CityAirQualityData />} />
                    <Route path="*" element={<Home />} /> {/*route that matches anything */}
                    
                </Route>
            </Routes>
        </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
