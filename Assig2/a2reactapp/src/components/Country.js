import { Link } from "react-router-dom";

const Country = (props) => {

    return (
        <div className="card col-4 mb-5" style={{ width: 25 + 'em' }}>
            <img className="card-img-top" src={props.imageUrl} alt={"Image of " + props.countryName} />
            <div className="card-body">
                <h5 className="card-title">{props.countryName}</h5>
                <p className="card-text">City Count: {props.cityCount}</p>
                <Link to={`/CountryEmissionData/${props.countryId}`} className="btn btn-primary">View Emission</Link>
            </div>
        </div>
    )
}

export default Country

