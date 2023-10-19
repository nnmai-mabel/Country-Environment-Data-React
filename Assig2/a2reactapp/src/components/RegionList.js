import { useState, useEffect } from 'react'
import Region from "./Region"

const RegionList = ({ }) => {
    const [regionData, setState] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5256/api/A_Regions")
            .then(response => response.json())
            .then(data => setState(data))
            .catch(err => {
                console.log(err);
            });
    }, [])

    return (
        <div className="row">
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
    )
}

export default RegionList