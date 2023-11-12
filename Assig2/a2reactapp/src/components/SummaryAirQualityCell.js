//props contain year, countryPM10Avg, countryPM10Min, countryPM10Max, countryPM25Avg, countryPM25Min, countryPM25Max
const SummaryAirQualityCell = (props) => {
    return (
        <tr>
            <td>{props.year}</td>
            <td>{props.countryPM10Avg}</td>
            <td>{props.countryPM10Min}</td>
            <td>{props.countryPM10Max}</td>
            <td>{Number(props.countryPM25Avg).toFixed(2)}</td>
            <td>{props.countryPM25Min}</td>
            <td>{props.countryPM25Max}</td>
        </tr>
    )
}

export default SummaryAirQualityCell
