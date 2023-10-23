import { Link } from "react-router-dom";

const CitySearchAndData = (props) => {

    return (
        <div>
            <div>
                <Link to={`/Countries`} className="btn btn-warning">Back to Countries</Link>
            </div>
            <div className="card col-4 mb-5" style={{ width: 25 + 'em' }}>
                <img className="card-img-top" src="..." alt={"Image of "} />
                <div className="card-body">
                    <h5 className="card-title">Cities list title</h5>
                    <p className="card-text">Cities list text</p>
                    <Link to={`/CityAirQualityData/${props.cityId}`} className="btn btn-primary">Air Quality</Link>
                </div>
            </div>
        </div>
    )
}

export default CitySearchAndData