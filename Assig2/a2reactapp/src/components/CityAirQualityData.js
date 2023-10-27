import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";

const CityAirQualityData = () => {

    // useParams() to get countryId from url
    let params = useParams();

    const [cityDetail, setCityDetail] = useState({});
    const [cityAirQualityData, setCityAirQualityData] = useState([]);

    const cityId = params.cityId;

    useEffect(() => {
        fetch(`http://localhost:5256/api/C_Cities/GetAirQualityData/${cityId}`)
            .then(response => response.json())
            .then(data => {
                setCityDetail(data.theCityDetail)
                setCityAirQualityData(data.theCityAirQualityData)
            })

            .catch(err => {
                console.log(err);
            });
    }, [cityId])

    return (
        <div>
            <div>
                <Link to={`/CitySearchAndData/${params.regionId}/${params.countryId}`} className="btn btn-warning">Cities</Link>
            </div>
            <div className="card mb-3" style={{ maxWidth: 540 + "px" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={cityDetail.imageUrl} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{cityDetail.cityName}</h5>
                            <p className="card-text">{cityDetail.countryName}</p>
                            <p className="card-text">{cityDetail.iso3}</p>
                            <p className="card-text">{cityDetail.regionName}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/*<table className="table table-warning">*/}
            {/*    <thead>*/}

            {/*        <tr>*/}

            {/*            <th>Year</th>*/}
            {/*            <th>Unit</th>*/}
            {/*            <th>Change</th>*/}
            {/*            <th>Value</th>*/}
            {/*            <th>Regional Average</th>*/}
            {/*            <th>Regional Min</th>*/}
            {/*            <th>Regional Max</th>*/}
            {/*        </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}

            {/*        {countryTemperatureData.map((obj, index) => (*/}

            {/*            <CountryTemperatureCell*/}
            {/*                key={index}*/}
            {/*                objectId={obj.theCountryTempData.objectId}*/}
            {/*                year={obj.theCountryTempData.year}*/}
            {/*                countryId={obj.theCountryTempData.countryId}*/}
            {/*                unit={obj.theCountryTempData.unit}*/}
            {/*                change={obj.theCountryTempData.change}*/}
            {/*                value={obj.theCountryTempData.value}*/}
            {/*                regionalAvg={obj.regionalAvg != null ? obj.regionalAvg : "N/A"}*/}
            {/*                regionalMin={obj.regionalMin != null ? obj.regionalMin : "N/A"}*/}
            {/*                regionalMax={obj.regionalMax != null ? obj.regionalMax : "N/A"}*/}
            {/*            />*/}

            {/*        )*/}
            {/*        )}*/}

            {/*    </tbody>*/}
            {/*</table>*/}
        </div>
    )
}

export default CityAirQualityData