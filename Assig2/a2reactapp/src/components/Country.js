import { Link } from "react-router-dom";

//props contains countryId, countryName, iso3, imageUrl, cityCount, regionId, regionImageUrl, regionName, countryCount
const Country = (props) => {

    return (
        <div className="card col-3 mb-5" style={{ width: 25 + 'rem', margin: 10, padding: 0 }}>
            <img className="card-img-top" src={props.imageUrl} alt={"Image of " + props.countryName} style={{ height: 16 + 'rem', width: 100 + "%", margin: 0 }} />
            <div className="card-body">
                <h4 className="card-title">{props.countryName} {props.iso3 != null && props.iso3 != "" ? `(${props.iso3})` : ""}</h4>
                <p className="card-text">City Count: {props.cityCount}</p>
                <p className="card-text">Emission Year Range: {props.emissionDataYearRange[0]} - {props.emissionDataYearRange[1]}</p>
                <p className="card-text">Temperature Year Range: {props.temperatureDataYearRange[0]} - {props.temperatureDataYearRange[1]}</p>

                {/*pass props through state because the region data are using all properties of the props*/}
                {props.emissionDataYearRange.length > 0 && props.emissionDataYearRange[0] > 0 ?
                    (
                        <Link to={`/CountryEmissionData/${props.regionId}/${props.countryId}`} state={props} className="btn btn-primary" style={{ margin: 5 }}>Emission</Link>
                    ) : (
                        ""
                    )
                }
                {props.temperatureDataYearRange.length > 0 && props.temperatureDataYearRange[0] > 0 ?
                    (
                        <Link to={`/CountryTemperatureData/${props.regionId}/${props.countryId}`} state={props} className="btn btn-success" style={{ margin: 5 }}>Temperature</Link>
                    ) : (
                        ""
                    )
                }
                {props.cityCount > 0 ?
                    (
                        <Link to={`/CitySearchAndData/${props.regionId}/${props.countryId}`} state={props} className="btn btn-warning" style={{ margin: 5 }}>Cities</Link>
                    ) : (
                        ""
                    )
                }

            </div>
        </div>
    )
}

export default Country
