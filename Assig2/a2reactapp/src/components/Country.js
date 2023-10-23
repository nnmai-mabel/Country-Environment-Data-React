import { Link } from "react-router-dom";

const Country = (props) => {
    return (
        <div className="card col-4 mb-5" style={{ width: 25 + 'em' }}>
            <img className="card-img-top" src={props.imageUrl} alt={"Image of " + props.countryName} />
            <div className="card-body">
                <h5 className="card-title">{props.countryName}</h5>
                <p className="card-text">City Count: {props.cityCount}</p>
                <p className="card-text">Emission Count: {props.emissionDataYearRange.length}</p>
                <p className="card-text">Temperature Count: {props.temperatureDataYearRange.length}</p>
                {props.emissionDataYearRange.length > 0 ?
                    (
                        <Link to={`/CountryEmissionData/${props.regionId}/${props.countryId}`} className="btn btn-primary">Emission</Link>
                    ) : (
                        <p>No emissions</p>
                    )
                }
                {props.temperatureDataYearRange.length > 0 ?
                    (
                        <Link to={`/CountryTemperatureData/${props.regionId}/${props.countryId}`} className="btn btn-success">Temperature</Link>
                    ) : (
                        <p>No temperature</p>
                    )
                }
                {props.cityCount > 0 ?
                    (
                        <Link to={`/CitySearchAndData/${props.regionId}/${props.countryId}`} className="btn btn-warning">Cities</Link>
                    ) : (
                        <p>No cities</p>
                    )
                }

            </div>
        </div>
    )
}

export default Country

