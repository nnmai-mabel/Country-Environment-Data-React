const CountryTemperatureCell = (props) => {
    return (
        <tr>
            <td>{props.year}</td>
            <td>{props.unit}</td>
            <td>{props.change}</td>
            <td>{props.value}</td>
            <td>{props.regionalAvg}</td>
            <td>{props.regionalMin}</td>
            <td>{props.regionalMax}</td>
        </tr>
    )
}

export default CountryTemperatureCell

