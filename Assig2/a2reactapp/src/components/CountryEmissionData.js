import { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import SummaryCountryEmissionCell from "./SummaryCountryEmissionCell";
import CountryEmissionCell from "./CountryEmissionCell";

const CountryEmissionData = () => {
    let params = useParams();

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
            <select className="form-select" aria-label="Default select example" value={elementId} onChange={changeElementId} name="selectElement">
                <option value="selectMenu">Open this select menu</option>

                {elementList.map((element) => (

                    <option key={element.elementId} value={element.elementId} >{element.elementName}</option>
                )
                )}

            </select>

            <div>
                <Link to={`/CountryList/${params.regionId}`} className="btn btn-warning">Back to Countries</Link>
            </div>
            <table className="table table-warning">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Element</th>
                        <th>Total Value</th>
                    </tr>
                </thead>
                <tbody>
                    {summaryCountryEmissionData.map((obj, index) => (
                        <SummaryCountryEmissionCell
                            key={index}
                            year={obj.year}
                            element={obj.element}
                            totalValue={obj.totalValue}
                        />
                    )
                    )}
                </tbody>
            </table>
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
