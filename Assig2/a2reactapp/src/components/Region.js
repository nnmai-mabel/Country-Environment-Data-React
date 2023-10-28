import { Link } from "react-router-dom";
import CountryList from "./CountryList";

const Region = (props) => {
    //let regionImage = ""
    //props.imageUrl != null && props.imageUrl != "" ? regionImage = props.imageUrl : regionImage = "https://e0.pxfuel.com/wallpapers/1010/550/desktop-wallpaper-light-earth-planet-for-section-%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D1%81-beautiful-planet-earth.jpg"
    //const regionData = { regionId: props.regionId, regionImageUrl: regionImage, regionName: props.regionName, countryCount: props.countryCount }

    return (
        <div className="card col-3 mb-5 justify-content-center" style={{ width: 25 + 'rem', margin: 10, padding: 0 }}>

            {props.imageUrl != null && props.imageUrl != "" ?
                (
                    <img className="card-img-top" src={props.imageUrl} alt={"Image of " + props.regionName} style={{ height: 16 + 'rem', width: 100 + "%", margin: 0 }} />

                ) : (
                    <div>
                        <img className="card-img-top" alt={"Image of " + props.regionName} style={{ height: 16 + 'rem', width: 100 + "%", margin: 0 }} src="https://e0.pxfuel.com/wallpapers/1010/550/desktop-wallpaper-light-earth-planet-for-section-%D0%BA%D0%BE%D1%81%D0%BC%D0%BE%D1%81-beautiful-planet-earth.jpg" />
                    </div>
                )
            }
            <div className="card-body">
                <h5 className="card-title">{props.regionName}</h5>
                <p className="card-text">Country Count: {props.countryCount}</p>
                <Link to={`/CountryList/${props.regionId}`} className="stretched-link"></Link>
            </div>
        </div>
    )
}

export default Region
