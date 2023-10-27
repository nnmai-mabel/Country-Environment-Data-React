import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import CountryTemperatureCell from "./CountryTemperatureCell";

const CountryTemperatureData = () => {
    let params = useParams();

    const [countryTemperatureData, setCountryTemperatureData] = useState([]);
    const [countryOverallTemperatureData, setOverallCountryTemperatureData] = useState({});

    const regionId = params.regionId;
    const countryId = params.countryId;

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
    }, [countryId])
    return (
        <div>
            <div className="row justify-content-center">
                <div className="bg-success py-1 mb-2">
                    <h2 className="text-center">Country Temperature Data from {countryOverallTemperatureData.minYear} to {countryOverallTemperatureData.maxYear}</h2>
                </div>
            </div>
            <div>
                <Link to={`/CountryList/${regionId}`} className="btn btn-warning">Back to Countries</Link>
            </div>
            {/*<div className="row justify-content-center">*/}
            <div>

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
            </div >
        </div >
    )
}

export default CountryTemperatureData