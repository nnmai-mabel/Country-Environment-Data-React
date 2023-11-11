import { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from "react-router-dom";
import CountryEmissionCell from "./CountryEmissionCell";
import RegionCountryData from "./RegionCountryData";
import ElementBarChart from "./ElementBarChart";

const CountryEmissionData = () => {
    let params = useParams();

    const location = useLocation()
    const regionCountryData = location.state

    const [summaryCountryEmissionData, setSummaryCountryEmissionData] = useState([]);
    const [countryEmissionData, setCountryEmissionData] = useState([]);
    const [elementList, setElementList] = useState([]);

    const countryId = params.countryId;
    const [elementId, setElementId] = useState(-1);

    useEffect(() => {
        fetch(`http://localhost:5256/api/B_Countries/SummaryCountryEmissionData/${countryId}`)
            .then(response => response.json())
            .then(data => {
                setSummaryCountryEmissionData(data)
                console.log(data);
            })

            .catch(err => {
                console.log(err);
            });
    }, [countryId])

    useEffect(() => {
        fetch(`http://localhost:5256/api/B_Countries/GetElementList`)
            .then(response => response.json())
            .then(data => {
                setElementList(data)

            })

            .catch(err => {
                console.log(err);
            });
    }, [])
    //console.log("current element id ", typeof elementId)

    useEffect(() => {
        if (elementId !== "selectMenu") {
            fetch(`http://localhost:5256/api/B_Countries/CountryEmissionData/${countryId}?elementId=${elementId}`)
                .then(response => response.json())
                .then(data => {
                    setCountryEmissionData(data)

                })

                .catch(err => {
                    console.log(err);
                });
        }

    }, [countryId, elementId])

    function changeElementId() {
        let newElementId = document.querySelector("[name=selectElement]").value;
        console.log('new element id', newElementId);
        setElementId(newElementId);
    }
    return (
        <div>
            
            <div className="row justify-content-center">
                <div className="bg-success py-1 mb-2">
                    <h2 className="text-center">Country Emission Data</h2>
                </div>
            </div>

            <div className="row">
                <Link to={`/CountryList/${params.regionId}`} className="btn btn-warning col-2">Back to Countries</Link>
            </div>
            <RegionCountryData
                regionImageUrl={regionCountryData.regionImageUrl}
                imageUrl={regionCountryData.imageUrl}
                regionName={regionCountryData.regionName}
                countryName={regionCountryData.countryName}
                iso3={regionCountryData.iso3}
                cityCount={regionCountryData.cityCount}
                countryCount={regionCountryData.countryCount}
            />
            <div style={{ margin: 0, padding: 0 }}>
                <ElementBarChart summaryCountryEmissionData={summaryCountryEmissionData} />
            </div>
            <div className="row">
                <select className="form-select" aria-label="Default select example" value={elementId} onChange={changeElementId} name="selectElement" style={{ width: 22 + 'rem', margin: 10 }}>
                    <option value="selectMenu">Select Element</option>

                    {elementList.map((element) => (

                        <option key={element.elementId} value={element.elementId} >{element.elementName}</option>
                    )
                    )}

                </select>
            </div>
            
            <table className="table table-info">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Item Name</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {countryEmissionData.map((obj, index) => (
                        <CountryEmissionCell
                            key={index}
                            year={obj.year}
                            itemName={obj.itemName}
                            value={obj.value}
                        />
                    )
                    )}
                </tbody>
            </table>

        </div >
    )
}

export default CountryEmissionData
