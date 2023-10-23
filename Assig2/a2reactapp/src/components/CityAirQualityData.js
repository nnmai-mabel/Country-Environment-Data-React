import { Link, useParams } from "react-router-dom";

const CityAirQualityData = (props) => {

    // useParams() to get countryId from url
    let params = useParams();
    return (
        <div>
            <div>
                <Link to={`/CitySearchAndData/${params.regionId}/${params.countryId}`} className="btn btn-warning">Cities</Link>
            </div>
            <div className="card col-4 mb-5" style={{ width: 25 + 'em' }}>
                <div className="card-body">
                    <h5 className="card-title">CityAirQualityData title</h5>
                    <p className="card-text">CityAirQualityData text</p>
                    {/*<Link to={`/Products/${props.itemId}?searchText=${props.searchText}`} className="btn btn-primary">View Detail</Link>*/}
                </div>
            </div>
        </div>
    )
}

export default CityAirQualityData