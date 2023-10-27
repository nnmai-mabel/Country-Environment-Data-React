import { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from "react-router-dom";
import Country from "./Country"

const CountryList = ({ }) => {
    let params = useParams();

    const [countryData, setCountryData] = useState([]); // set initial countryData to empty array
    const [query, setQuery] = useState('');

    const location = useLocation();
    const regionData = location.state;

    // If use useState() to initialise regionId, the page will keep the state (the value) -> the regionId stays the same
    // after re-rendering. However, if only use a normal variable, the page won't be re-rendered and won't keep the
    // value after reloading
    const regionId = params.regionId ?? 0; // set regionId to the URL regionId parameter, if empty, default as 0

    {/*data fetched is an object, need to access the key "countryList", which is an array of object, then map to array in return*/ }
    useEffect(() => {
        //setRegionId(regionId);
        fetch(`http://localhost:5256/api/B_Countries/CountryList/${regionId}?searchText=${query}`)
            .then(response => response.json())
            .then(data => setCountryData(data.countryList))
            //.then(data => console.log("FEtch"))
            .catch(err => {
                console.log(err);
            });
    }, [regionId, query]) // regionId is a reactive value and needs to change on a re-render -> put in dependency list

    //Create the searchQuery() function after the useEffect hook to capture the textbox text value then use it to update the query state
    function searchQuery(evt) {
        const value = document.querySelector('[name="searchText"]').value;
        setQuery(value);
    }

    return (
        <div className="container">
            {regionData != null ? (
                <div className="row justify-content-center">
                    <div className="card bg-dark text-black" style={{ width: 25 + 'rem', padding: 0, margin: 10 }}>
                        <img src={regionData.regionImageUrl} className="card-img" alt={regionData.regionName} />
                        <div className="card-img-overlay" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                            <h5 className="card-title">{regionData.regionName}</h5>
                            <p className="card-text">Number of Countries: {regionData.countryCount}</p>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}

            <div className="row justify-content-center">
                <div className="bg-success py-1 mb-2">
                    <h2 className="text-center">Countries</h2>
                </div>
            </div>
            <div>
                <div className="row py-1 mb-2 justify-content-center">
                    <div className="col-3">
                        <Link to={`/RegionList`} className="btn btn-warning">Regions</Link>
                    </div>
                    <div className="col-3">
                        <input type="text" name="searchText" className="form-control" placeholder="Type your query" />
                    </div>
                    <div className="col-2">
                        {/*Attach a ReactJS event to the button called “searchQuery” using the ReactJS syntax onClick={searchQuery}*/}
                        <button type="button" className="btn btn-primary" onClick={searchQuery}>Search</button>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                {/*Change object's key and value to array*/}

                {countryData.length > 0 ? (
                    countryData.map((obj) => (
                        <Country
                            key={obj.countryId}
                            countryId={obj.countryId}
                            countryName={obj.countryName}
                            iso3={obj.iso3}
                            imageUrl={obj.imageUrl}
                            cityCount={obj.cityCount}
                            emissionDataYearRange={obj.emissionDataYearRange}
                            temperatureDataYearRange={obj.temperatureDataYearRange}
                            regionId={regionId}
                        />
                    )
                    )
                ) : (
                    <div className="bg-warning py-1 mb-2">
                        <h2 className="text-center">No Countries available</h2>
                    </div>
                )}
            </div>
        </div >
    )
}

export default CountryList