import { Link } from "react-router-dom";

const CitySearchAndData = (props) => {

    return (
        <div className="card col-4 mb-5" style={{ width: 25 + 'em' }}>
            <img className="card-img-top" src="..." alt={"Image of "} />
            <div className="card-body">
                <h5 className="card-title">Cities list title</h5>
                <p className="card-text">Cities list text</p>
                {/*<Link to={`/Products/${props.itemId}?searchText=${props.searchText}`} className="btn btn-primary">View Detail</Link>*/}
            </div>
        </div>
    )
}

export default CitySearchAndData