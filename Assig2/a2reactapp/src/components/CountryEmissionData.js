import { Link } from "react-router-dom";

const CountryEmissionData = (props) => {

    return (
        <div>
            <div>
                <Link to={`/Countries`} className="btn btn-warning">Back to Countries</Link>
            </div>
            <div className="card col-4 mb-5" style={{ width: 25 + 'em' }}>
                <img className="card-img-top" src="..." alt={"Image of "} />
                <div className="card-body">
                    <h5 className="card-title">Emission title</h5>
                    <p className="card-text">Emisison text</p>
                    {/*<Link to={`/Products/${props.itemId}?searchText=${props.searchText}`} className="btn btn-primary">View Detail</Link>*/}
                    
                </div>
            </div>
        </div>
    )
}

export default CountryEmissionData
