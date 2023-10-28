const RegionCountryData = (regionCountryData) => {
    return (
        <div className="row justify-content-center">
            <div className="image-container">
                {regionCountryData.regionImageUrl != null && regionCountryData.regionImageUrl != "" ? (
                    <img src={regionCountryData.regionImageUrl} className="card-img" alt={regionCountryData.regionName} />
                ) : (
                    <img src="https://e0.pxfuel.com/wallpapers/1010/550/desktop-wallpaper-light-earth-planet-for-section-%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D1%81-beautiful-planet-earth.jpg" className="card-img" alt={regionCountryData.regionName} />

                )}                    <div className="text-overlay">
                    <div className="left-column">
                        <h1>{regionCountryData.countryName} {regionCountryData.iso3 ? `(${regionCountryData.iso3})` : ""}</h1>
                        <h2>{regionCountryData.regionName}</h2>
                        <div className="mt-5">
                            <div className="mb-5">
                                <p>Number of Cities: {regionCountryData.cityCount}</p>
                                <p>Countries in the same Region: {regionCountryData.countryCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="right-column">
                        <img src={regionCountryData.imageUrl} className="card-img" alt={regionCountryData.countryName} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegionCountryData