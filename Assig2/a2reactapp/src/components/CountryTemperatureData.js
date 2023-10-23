﻿import { Link, useParams } from "react-router-dom";

const CountryTemperatureData = () => {
    let params = useParams();

    return (
        <div>
            <div>
                <Link to={`/CountryList/${params.regionId}`} className="btn btn-warning">Back to Countries</Link>
            </div>
            <div className="card col-4 mb-5" style={{ width: 25 + 'em' }}>
                <img className="card-img-top" src="..." alt={"Image of "} />
                <div className="card-body">
                    <h5 className="card-title">Temperature title</h5>
                    <p className="card-text">Temperature text</p>
                    {/*<Link to={`/Products/${props.itemId}?searchText=${props.searchText}`} className="btn btn-primary">View Detail</Link>*/}
                </div>
            </div>
        </div>
    )
}

export default CountryTemperatureData