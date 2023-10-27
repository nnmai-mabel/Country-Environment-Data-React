import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import CityDetail from "./CityDetail";

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
            <CityDetail
                key={cityDetail.cityId}
                cityId={cityDetail.cityId}
                imageUrl={cityDetail.imageUrl}
                cityName={cityDetail.cityName}
                countryName={cityDetail.countryName}
                iso3={cityDetail.iso3}
                regionName={cityDetail.regionName }
            />

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