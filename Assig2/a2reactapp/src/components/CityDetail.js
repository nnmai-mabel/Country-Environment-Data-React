const CityDetail = (cityDetail) => {
    return (
        <div className="card mb-3" style={{ maxWidth: 540 + "px" }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={cityDetail.imageUrl} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{cityDetail.cityName}</h5>
                        <p className="card-text">{cityDetail.countryName}</p>
                        <p className="card-text">{cityDetail.iso3}</p>
                        <p className="card-text">{cityDetail.regionName}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CityDetail