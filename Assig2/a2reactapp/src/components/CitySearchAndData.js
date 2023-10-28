import { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from "react-router-dom";
import City from "./City"
import RegionCountryData from "./RegionCountryData";

const CitySearchAndData = ({ }) => {
    let params = useParams();

    const location = useLocation()
    const regionCountryData = location.state

    const [cityData, setCityData] = useState([]); // set initial cityData to empty array
    const [query, setQuery] = useState('');

    const [countryId, setCountryId] = useState(params.countryId ?? 0); // set countryId to the URL regionId parameter

    {/*data fetched is an object, need to access the key "countryList", which is an array of object, then map to array in return*/ }
    useEffect(() => {
        //setRegionId(regionId);
        fetch(`http://localhost:5256/api/C_Cities/${countryId}?searchText=${query}`)
            .then(response => response.json())
            .then(data => setCityData(data))
            //.then(data => console.log("FEtch"))
            .catch(err => {
                console.log(err);
            });
    }, [countryId, query]) // countryId is a reactive value and needs to change on a re-render -> put in dependency list

    //Create the searchQuery() function after the useEffect hook to capture the textbox text value then use it to update the query state
    function searchQuery(evt) {
        // const value = evt.target.value;
        const value = document.querySelector('[name="searchText"]').value;
        //alert('value: ' + value);
        setQuery(value);
    }
    return (
        <div>
            <div className="row">
                <div className="bg-primary py-1 mb-2">
                    <h2 className="text-center">Cities</h2>
                </div>
            </div>
            <RegionCountryData
                regionImageUrl={regionCountryData.regionImageUrl}
                imageUrl={regionCountryData.imageUrl}
                regionName={regionCountryData.regionName}
                countryName={regionCountryData.countryName}
                iso3={regionCountryData.iso3}
                cityCount={regionCountryData.cityCount}
                countryCount={regionCountryData.countryCount}
            />
            <div>
                <div className="row py-1 mb-2">
                    <div className="col-3">
                        <Link to={`/CountryList/${params.regionId}`} className="btn btn-warning">Back to Countries</Link>
                    </div>
                    <div className="col-3">
                        <input type="text" name="searchText" className="form-control" placeholder="Search Cities" />
                    </div>
                    <div className="col-2">
                        {/*Attach a ReactJS event to the button called “searchQuery” using the ReactJS syntax onClick={searchQuery}*/}
                        <button type="button" className="btn btn-primary" onClick={searchQuery}>Search</button>
                    </div>
                </div>
            </div>
            <div className="row">
                {/*Change object's key and value to array*/}

                {cityData.length > 0 ? (
                    cityData.map((obj) => (
                        <City
                            key={obj.cityID}
                            cityId={obj.cityID}
                            cityName={obj.cityName}
                            airQualityYearRange={obj.emissionDataYearRange}
                            recordCount={obj.recordCount}
                            countryId={countryId}
                            regionId={params.regionId}
                            regionCountryData={regionCountryData }
                        />
                    )
                    )
                ) : (
                    <div className="bg-warning py-1 mb-2">
                        <h2 className="text-center">No Cities available matched search</h2>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CitySearchAndData