import { Link } from "react-router-dom";

const City = (props) => {
    return (
        <div className="card col-4 mb-5" style={{ width: 25 + 'em' }}>
            <div className="card-body">
                <h5 className="card-title">{props.cityName}</h5>
                <p className="card-text">Record Count: {props.recordCount}</p>
                <p className="card-text">City ID: {props.cityId}</p>
                <Link to={`/CityAirQualityData/${props.regionId}/${props.countryId}/${props.cityId}`} state={props.regionCountryData} className="btn btn-primary">Air Quality</Link>
            </div>
        </div>
    )
}

export default City

