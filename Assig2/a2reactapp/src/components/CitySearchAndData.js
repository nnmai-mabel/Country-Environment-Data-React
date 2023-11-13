import { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from "react-router-dom";
import City from "./City"
import RegionCountryData from "./RegionCountryData";

const CitySearchAndData = ({ }) => {

    // useParams() to get countryId from url
    let params = useParams();
    const [countryId, setCountryId] = useState(params.countryId ?? 0); // set countryId to the URL countryId parameter, default 0 if null

    // useLocation() to get the region and country data from the link leading to this page
    const location = useLocation()
    const regionCountryData = location.state

    // Set initial cityData to empty array
    const [cityData, setCityData] = useState([]);

    // Set inital query for searching cities in the country
    const [query, setQuery] = useState('');

    {/*data fetched is an object, need to access the key "countryList", which is an array of object, then map to array in return*/ }
    useEffect(() => {
        fetch(`http://localhost:5256/api/C_Cities/${countryId}?searchText=${query}`)
            .then(response => response.json())
            .then(data => setCityData(data))
            .catch(err => {
                console.log(err);
            });
    }, [countryId, query]) // countryId is a reactive value and needs to change on a re-render -> put in dependency list

    //Create the searchQuery() function after the useEffect hook to capture the textbox text value then use it to update the query state
    function searchQuery(evt) {
        const value = document.querySelector('[name="searchText"]').value;
        setQuery(value);
    }
    return (
        <div className="container">
            
            {/*Use component to show region and country data on the page*/}
            <RegionCountryData
                regionImageUrl={regionCountryData.regionImageUrl}
                imageUrl={regionCountryData.imageUrl}
                regionName={regionCountryData.regionName}
                countryName={regionCountryData.countryName}
                iso3={regionCountryData.iso3}
                cityCount={regionCountryData.cityCount}
                countryCount={regionCountryData.countryCount}
            />

            <div className="row py-1 mb-2">
                <div className="bg-warning py-1 mb-2">
                    <h2 className="text-center">Cities in {regionCountryData.countryName}</h2>
                </div>
            </div>

            {/*Show alert for number of cities matched the search*/}
            <div className="alert alert-success" role="alert">
                {`There ${cityData.length === 1 ? "is" : "are"} ${cityData.length}
                    ${cityData.length === 1 ? "city that matches" : "cities that match"}  your search in ${regionCountryData.countryName} region ${regionCountryData.regionName}.`}
            </div>

            <div className="row py-1 mb-2">
                <div className="col-md-3 ml-0 mb-2 text-start">

                    {/*Link to go back to country list*/}
                    <Link to={`/CountryList/${params.regionId}`} className="btn btn-warning">Back to Countries</Link>
                </div>
                <div className="col-md-5 mb-2">
                    <input type="text" name="searchText" className="form-control" placeholder="Search Cities" />
                </div>
                <div className="col-md-2 mb-2">

                    {/*Attach a ReactJS event to the button called “searchQuery” using the ReactJS syntax onClick={searchQuery}*/}
                    <button type="button" className="btn btn-primary" onClick={searchQuery}>Search</button>
                </div>
            </div>

            <div className="row justify-content-center">

                {/*Map through each object to get data*/}
                {cityData.length > 0 ? (
                    cityData.map((obj) => (
                        <City
                            key={obj.cityID}
                            cityId={obj.cityID}
                            cityName={obj.cityName}
                            airQualityYearRange={obj.airQualityYearRange}
                            recordCount={obj.recordCount}
                            countryId={countryId}
                            regionId={params.regionId}
                            regionCountryData={regionCountryData}
                        />
                    )
                    )
                ) : (
                    ""
                )}
            </div>
        </div>
    )
}

export default CitySearchAndData