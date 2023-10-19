import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import Country from "./Country"

const CountryList = ({ }) => {
    let params = useParams();

    const [countryData, setState] = useState([]); // set initial countryData to empty array
    const [regionId, setRegionId] = useState(params.regionId); // set regionId to the URL regionId parameter

    {/*data fetched is an object, need to access the key "countryList", which is an array of object, then map to array in return*/ }
    useEffect(() => {
        fetch(`http://localhost:5256/api/B_Countries/CountryList/${regionId}`)
            .then(response => response.json())
            .then(data => setState(data.countryList)) 
            .catch(err => {
                console.log(err);
            });
    }, [])

    return (
        <div className="row">
            <div className="bg-success py-1 mb-2">
                <h2 className="text-center">Countries</h2>
            </div>
            {/*Change object's key and value to array*/}
            {countryData.map((obj) => (
                <Country
                    key={obj.countryId}
                    countryId={obj.countryId}
                    countryName={obj.countryName}
                    iso3={obj.iso3 }
                    imageUrl={obj.imageUrl}
                    cityCount={obj.cityCount}
                />
            )
            )
            }
        </div>
    )
}

export default CountryList