const CityAirQualityCell = (props) => {
    return (
        <tr>
            <td>{props.year}</td>
            <td>{props.annualMean}</td>
            <td>{props.temporalCoverage1}</td>
            <td>{props.annualMeanPm10}</td>
            <td>{props.annualMeanUgm3}</td>
            <td>{props.temporalCoverage2}</td>
            <td>{props.annualMeanPm25}</td>
            <td>{props.reference}</td>
            <td>{props.dbYear}</td>
            <td>{props.status}</td>
        </tr>
    )
}

export default CityAirQualityCell

