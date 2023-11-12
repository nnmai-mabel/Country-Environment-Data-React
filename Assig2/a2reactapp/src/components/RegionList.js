import { useState, useEffect } from 'react'
import Region from "./Region"

// Create region list component to show a list of regions
const RegionList = ({ }) => {
    const [regionData, setRegionData] = useState([]);

    //Fetch data from api
    useEffect(() => {
        fetch("http://localhost:5256/api/A_Regions")
            .then(response => response.json())
            .then(data => setRegionData(data))
            .catch(err => {
                console.log(err);
            });
    }, [])

    return (
        <div className="container">
            <div className="bg-success py-1 mb-2 row">
                <h2 className="text-center">Regions</h2>
            </div>
            <div className="row justify-content-center">

            {/*Map through each object to get the data and pass through region component*/}
                {regionData.map((obj) => (
                    <Region
                        key={obj.regionId}
                        regionId={obj.regionId}
                        regionName={obj.regionName}
                        imageUrl={obj.imageUrl}
                        countryCount={obj.countryCount}
                    />
                )
                )
                }
            </div>
        </div>
    )
}

export default RegionList