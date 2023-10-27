import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import CityDetail from "./CityDetail";
import SummaryAirQualityCell from "./SummaryAirQualityCell";
import DataStationDetailCell from "./DataStationDetailCell";

const CityAirQualityData = () => {

    // useParams() to get countryId from url
    let params = useParams();

    const [cityDetail, setCityDetail] = useState({});
    const [cityAirQualityData, setCityAirQualityData] = useState([]);
    const [airQualityData, setAirQualityData] = useState({});
    const [dataStationDetail, setDataStationDetail] = useState([]);

    const cityId = params.cityId;

    useEffect(() => {
        fetch(`http://localhost:5256/api/C_Cities/GetAirQualityData/${cityId}`)
            .then(response => response.json())
            .then(data => {
                setCityDetail(data.theCityDetail)
                setCityAirQualityData(data.theCityAirQualityData)
                setAirQualityData(data.theCityAirQualityData.theAirQualityData)
                setDataStationDetail(data.theCityAirQualityData)
                //console.log("Data station")
                //console.log(data.theCityAirQualityData)
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
                regionName={cityDetail.regionName}
            />

            <table className="table table-success">
                <thead>

                    <tr>

                        <th>Year</th>
                        <th>Country PM10 Average</th>
                        <th>Country PM10 Min</th>
                        <th>Country PM10 Max</th>
                        <th>Regional Average</th>
                        <th>Regional Min</th>
                        <th>Regional Max</th>
                    </tr>
                </thead>
                <tbody>

                    {cityAirQualityData.map((obj, index) => (

                        <SummaryAirQualityCell
                            key={index}
                            year={obj.year}
                            countryPM10Avg={obj.countryPM10Avg}
                            countryPM10Min={obj.countryPM10Min}
                            countryPM10Max={obj.countryPM10Max}
                            countryPM25Avg={obj.countryPM25Avg}
                            countryPM25Min={obj.countryPM25Min}
                            countryPM25Max={obj.countryPM25Max}

                        />

                    )
                    )}

                </tbody>
            </table>

            <table className="table table-warning">
                <thead>

                    <tr>
                    <th>Year</th>
                        <th>Station Type</th>
                        <th>Station Number</th>
                    </tr>
                </thead>
                <tbody>
                    {dataStationDetail.map((stationData, index) => (
                        //console.log(stationData)
                        stationData.dataStationDetail.map((station, i) => (
                                <DataStationDetailCell
                                key={i}
                                year={stationData.year}
                                    stationType={station.stationType}
                                    stationNumber={station.stationNumber}
                                />
                        ))


                    )
                    )}

                </tbody>
            </table>
        </div>
    )
}

export default CityAirQualityData