const SummaryAirQualityCell = (props) => {
    return (
        <tr>
            <td>{props.year}</td>
            <td>{props.countryPM10Avg}</td>
            <td>{props.countryPM10Min}</td>
            <td>{props.countryPM10Max}</td>
            <td>{props.countryPM25Avg}</td>
            <td>{props.countryPM25Min}</td>
            <td>{props.countryPM25Max}</td>
        </tr>
    )
}

export default SummaryAirQualityCell
