const Region = (props) => {

    return (
        <div className="card col-4 mb-5" style={{ width: 25 + 'em' }}>
            <img className="card-img-top" src={props.imageUrl} alt={"Image of " + props.regionName} />
            <div className="card-body">
                <h5 className="card-title">{props.regionName}</h5>
                <p className="card-text">Country Count: {props.countryCount }</p>
                {/*<Link to={`/Products/${props.itemId}?searchText=${props.searchText}`} className="btn btn-primary">View Detail</Link>*/}
            </div>
        </div>
    )
}

export default Region
