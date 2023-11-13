import { useState, useEffect } from 'react'
import { Link, useParams, useLocation } from "react-router-dom";
import CountryEmissionCell from "./CountryEmissionCell";
import RegionCountryData from "./RegionCountryData";
import ElementBarChart from "./ElementBarChart";

const CountryEmissionData = () => {

    // useParams() to get countryId from url
    let params = useParams();
    const countryId = params.countryId;

    // useLocation() to get the region and country data from the link leading to this page
    const location = useLocation()
    const regionCountryData = location.state

    // Set initial country emission summary, country emission data, element list to empty array
    const [summaryCountryEmissionData, setSummaryCountryEmissionData] = useState([]);
    const [countryEmissionData, setCountryEmissionData] = useState([]);
    const [elementList, setElementList] = useState([]);

    // Set inital elementId
    const [elementId, setElementId] = useState(-1);

    // Fetch country emission summary through API
    useEffect(() => {
        fetch(`http://localhost:5256/api/B_Countries/SummaryCountryEmissionData/${countryId}`)
            .then(response => response.json())
            .then(data => {
                setSummaryCountryEmissionData(data)
            })
            .catch(err => {
                console.log(err);
            });
    }, [countryId])

    // Fetch element list through API
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

    // Fetch country emission data through API
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

    // Change the element Id when a new option is selected
    function changeElementId() {
        let newElementId = document.querySelector("[name=selectElement]").value;
        setElementId(newElementId);
    }

    return (
        <div>
            <div className="row justify-content-center">
                <div className="bg-info py-1 mb-2">
                    <h2 className="text-center">Country Emission Data from {regionCountryData.emissionDataYearRange[0]} to {regionCountryData.emissionDataYearRange[1]}</h2>
                </div>
            </div>

            {/*Link back to country list*/}
            <div className="row">
                <Link to={`/CountryList/${params.regionId}`} className="btn btn-warning col-2">Back to Countries</Link>
            </div>

            {/*Use component to show region and country data on the page*/}
            <RegionCountryData
                regionImageUrl={regionCountryData.regionImageUrl}
                imageUrl={regionCountryData.imageUrl}
                regionName={regionCountryData.regionName}
                countryName={regionCountryData.countryName}
                iso3={regionCountryData.iso3}
                cityCount={regionCountryData.cityCount}
                countryCount={regionCountryData.countryCount}
            />

            {/*Use component to show the summary country emission data bar chart*/}
            <div style={{ margin: 0, padding: 0 }}>
                <ElementBarChart summaryCountryEmissionData={summaryCountryEmissionData} />
            </div>

            {/*Show the options to select an element*/}
            <div className="row">
                <select className="form-select" aria-label="Default select example" value={elementId} onChange={changeElementId} name="selectElement" style={{ width: 22 + 'rem', margin: 10 }}>
                    <option value="selectMenu">Select Element</option>

                    {/*Map through each object to get data*/}
                    {elementList.map((element) => (
                        <option key={element.elementId} value={element.elementId} >{element.elementName}</option>
                    )
                    )}

                </select>
            </div>

            {/*Table to show country emission based on Item*/}
            <h4 className="mb-3">Country Emissions by Item</h4>
            <table className="table table-info">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Item Name</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>

                    {/*Map through each object to get data*/}
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
        </div>
    )
}

export default CountryEmissionData
