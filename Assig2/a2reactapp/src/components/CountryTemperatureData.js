import { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from "react-router-dom";
import CountryTemperatureCell from "./CountryTemperatureCell";
import RegionCountryData from "./RegionCountryData";

const CountryTemperatureData = () => {

    // useParams() to get regionId and countryId from url
    let params = useParams();
    const regionId = params.regionId;
    const countryId = params.countryId;

    // useLocation() to get the region and country data from the link leading to this page
    const location = useLocation()
    const regionCountryData = location.state

    // Set initial country temperature data and country overall temperature data to empty object
    const [countryTemperatureData, setCountryTemperatureData] = useState([]);
    const [countryOverallTemperatureData, setOverallCountryTemperatureData] = useState({});

    //Fetch data from API and update the data
    useEffect(() => {
        fetch(`http://localhost:5256/api/B_Countries/CountryTemperatureDetail/${countryId}`)
            .then(response => response.json())
            .then(data => {
                setOverallCountryTemperatureData(data)
                setCountryTemperatureData(data.rawTemperatureData)
            })
            .catch(err => {
                console.log(err);
            });
    }, [countryId]) // to stop cyclic requests

    return (
        <div>
            <div className="row justify-content-center">
                <div className="bg-success py-1 mb-2">
                    <h2 className="text-center">Country Temperature Data from {countryOverallTemperatureData.minYear} to {countryOverallTemperatureData.maxYear}</h2>
                </div>
            </div>

            {/*Link go back to country list*/}
            <div className="row">
                <Link to={`/CountryList/${regionId}`} className="btn btn-warning col-2">Back to Countries</Link>
            </div>

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

            {/*Table to show country temperature*/}
            <h4 className="mb-3">Country Temperature</h4>
            <table className="table table-warning">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Unit</th>
                        <th>Change</th>
                        <th>Value</th>
                        <th>Regional Average</th>
                        <th>Regional Min</th>
                        <th>Regional Max</th>
                    </tr>
                </thead>
                <tbody>

                    {/*Map through each object to get data*/}
                    {countryTemperatureData.map((obj, index) => (
                        <CountryTemperatureCell
                            key={index}
                            objectId={obj.theCountryTempData.objectId}
                            year={obj.theCountryTempData.year}
                            countryId={obj.theCountryTempData.countryId}
                            unit={obj.theCountryTempData.unit}
                            change={obj.theCountryTempData.change}
                            value={obj.theCountryTempData.value}
                            regionalAvg={obj.regionalAvg != null ? obj.regionalAvg : "N/A"}
                            regionalMin={obj.regionalMin != null ? obj.regionalMin : "N/A"}
                            regionalMax={obj.regionalMax != null ? obj.regionalMax : "N/A"}
                        />

                    )
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default CountryTemperatureData