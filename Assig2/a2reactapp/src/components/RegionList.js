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
        <div>
            <div className="bg-success py-1 mb-2">
                <h2 className="text-center">Regions</h2>
            </div>
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
        </div>
    )
}

export default RegionList