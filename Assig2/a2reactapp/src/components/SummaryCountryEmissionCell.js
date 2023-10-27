const SummaryCountryEmissionCell = (props) => {
    return (
        <tr>
            <td>{props.year}</td>
            <td>{props.element}</td>
            <td>{props.totalValue}</td>
        </tr>
    )
}

export default SummaryCountryEmissionCell
