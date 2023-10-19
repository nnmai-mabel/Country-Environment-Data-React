const RegionList = () => {

    return (
        <div className="card col-4 mb-2" style={{ width: 18 + 'em' }}>
            <img className="card-img-top" src="..." alt={"Image of "} />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">card description</p>
                <p className="card-text">another description</p>
                {/*<Link to={`/Products/${props.itemId}?searchText=${props.searchText}`} className="btn btn-primary">View Detail</Link>*/}
            </div>
        </div>
    )
}

export default RegionList