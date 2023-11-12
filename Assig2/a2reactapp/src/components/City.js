import { Link } from "react-router-dom";

//props include cityId, cityName, airQualityYearRange, recordCount, countryId, regionId, regionCountryData
const City = (props) => {
    return (

        //Show city information
        <div className="card col-3 mb-5" style={{ width: 25 + 'em', margin: 10, padding: 0 }}>
            <div className="card-body">
                <h5 className="card-title">{props.cityName}</h5>
                <p className="card-text">Record Count: {props.recordCount}</p>
                <p className="card-text">Air Quality Data Year Range: {`${props.airQualityYearRange[0]} - ${props.airQualityYearRange[1]}`}</p>

                {/*View air quality data of each city*/}
                <Link to={`/CityAirQualityData/${props.regionId}/${props.countryId}/${props.cityId}`} state={props.regionCountryData} className="btn btn-primary">Air Quality</Link>
            </div>
        </div>
    )
}

export default City

