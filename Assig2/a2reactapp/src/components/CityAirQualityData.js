import { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from "react-router-dom";
import SummaryAirQualityCell from "./SummaryAirQualityCell";
import DataStationDetailCell from "./DataStationDetailCell";
import CityAirQualityCell from "./CityAirQualityCell";
import RegionCountryData from "./RegionCountryData";

const CityAirQualityData = () => {

    // useParams() to get countryId from url
    let params = useParams();
    const cityId = params.cityId;

    // useLocation() to get the region and country data from the link leading to this page
    const location = useLocation()
    const regionCountryData = location.state

    const [cityDetail, setCityDetail] = useState({});
    const [cityAirQualityData, setCityAirQualityData] = useState([]);

    // Fetch air quality data of each city from the API and update the data
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
    }, [cityId]) // [] to stop cylic requests

    return (
        <div className="container">

            {/*Link to go back to city list of the same country*/}
            <div className="row mt-3">
                <Link to={`/CitySearchAndData/${params.regionId}/${params.countryId}`} state={regionCountryData} className="btn btn-warning col-3">Back to Cities</Link>
            </div>

            {/*Use component to show region and country data on the page*/}
            <RegionCountryData
                cityId={cityDetail.cityId}
                cityName={cityDetail.cityName}
                regionImageUrl={regionCountryData.regionImageUrl}
                imageUrl={regionCountryData.imageUrl}
                regionName={regionCountryData.regionName}
                countryName={regionCountryData.countryName}
                iso3={regionCountryData.iso3}
                cityCount={regionCountryData.cityCount}
                countryCount={regionCountryData.countryCount}
            />

            {/*Table shows city air quality data summary*/}
            <h4 className="mt-3 mb-3">City Air Quality Data Summary</h4>
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

                    {/*Map through each object to show data*/}
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

            {/*Table shows city air quality data*/}
            <h4 className="mt-5 mb-3">City Air Quality Data</h4>
            <table className="table table-info">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Annual Mean</th>
                        <th>Temporal Coverage 1</th>
                        <th>Annual Mean PM10</th>
                        <th>Annual Mean UGM3</th>
                        <th>Temporal Coverage 2</th>
                        <th>Annual Mean PM25</th>
                        <th>Reference</th>
                        <th>Database Year</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>

                    {/*Map through each object to show data*/}
                    {cityAirQualityData.map((obj, index) => (
                        <CityAirQualityCell
                            key={index}
                            cityId={obj.theAirQualityData.cityId}
                            year={obj.year}
                            rowId={obj.theAirQualityData.rowId}
                            annualMean={obj.theAirQualityData.annualMean}
                            temporalCoverage1={obj.theAirQualityData.temporalCoverage1}
                            annualMeanPm10={obj.theAirQualityData.annualMeanPm10}
                            annualMeanUgm3={obj.theAirQualityData.annualMeanUgm3}
                            temporalCoverage2={obj.theAirQualityData.temporalCoverage2}
                            annualMeanPm25={obj.theAirQualityData.annualMeanPm25}
                            reference={obj.theAirQualityData.reference}
                            dbYear={obj.theAirQualityData.dbYear}
                            status={obj.theAirQualityData.status}
                        />
                    )
                    )}
                </tbody>
            </table>

            {/*Table shows city air quality data*/}
            <h4 className="mt-5 mb-3">Station Data</h4>
            <table className="table table-warning">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Station Type</th>
                        <th>Station Number</th>
                    </tr>
                </thead>
                <tbody>

                    {/*Map through each object to show data*/}
                    {cityAirQualityData.map((stationData, index) => (
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