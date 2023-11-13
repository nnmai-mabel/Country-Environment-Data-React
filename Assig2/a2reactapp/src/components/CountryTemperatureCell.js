//props contain year, unit, change, value, regionalAvg, regionalMin, regionalMax
const CountryTemperatureCell = (props) => {
    return (
        <tr>
            <td>{props.year}</td>
            <td>{props.unit}</td>
            <td>{props.change}</td>
            <td>{Number(props.value).toFixed(3)}</td>
            <td>{Number(props.regionalAvg).toFixed(3)}</td>
            <td>{Number(props.regionalMin).toFixed(3)}</td>
            <td>{Number(props.regionalMax).toFixed(3)}</td>
        </tr>
    )
}

export default CountryTemperatureCell

