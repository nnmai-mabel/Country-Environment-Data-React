import { Link } from "react-router-dom";

const Country = (props) => {

    const regionCountryData = {
        countryId: props.countryId,
        countryName: props.countryName,
        iso3: props.iso3,
        imageUrl: props.imageUrl,
        cityCount: props.cityCount,
        regionId: props.regionId,
        regionImageUrl: props.regionImageUrl,
        regionName: props.regionName,
        countryCount: props.countryCount
    }
    return (
        <div className="card col-3 mb-5" style={{ width: 25 + 'rem', margin: 10, padding: 0 }}>
            <img className="card-img-top" src={props.imageUrl} alt={"Image of " + props.countryName} style={{ height: 16 + 'rem', width: 100 + "%", margin: 0 }} />
            <div className="card-body">
                <h4 className="card-title">{props.countryName} {props.iso3 != null && props.iso3 != "" ? `(${props.iso3})` : ""}</h4>
                <p className="card-text">City Count: {props.cityCount}</p>
                <p className="card-text">Emission Year Range: {props.emissionDataYearRange[0]} - {props.emissionDataYearRange[1]}</p>
                <p className="card-text">Temperature Year Range: {props.temperatureDataYearRange[0]} - {props.temperatureDataYearRange[1]}</p>

                {props.emissionDataYearRange.length > 0 && props.emissionDataYearRange[0] > 0 ?
                    (
                        <Link to={`/CountryEmissionData/${props.regionId}/${props.countryId}`} state={regionCountryData} className="btn btn-primary" style={{ margin: 5 }}>Emission</Link>
                    ) : (
                        ""
                    )
                }
                {props.temperatureDataYearRange.length > 0 && props.temperatureDataYearRange[0] > 0 ?
                    (
                        <Link to={`/CountryTemperatureData/${props.regionId}/${props.countryId}`} state={regionCountryData} className="btn btn-success" style={{ margin: 5 }}>Temperature</Link>
                    ) : (
                        ""
                    )
                }
                {props.cityCount > 0 ?
                    (
                        <Link to={`/CitySearchAndData/${props.regionId}/${props.countryId}`} state={regionCountryData} className="btn btn-warning" style={{ margin: 5 }}>Cities</Link>
                    ) : (
                        ""
                    )
                }

            </div>
        </div>
    )
}

export default Country
