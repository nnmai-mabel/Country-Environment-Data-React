const CountryEmissionCell = (props) => {
    return (
        <tr>
            <td>{props.year}</td>
            <td>{props.itemName}</td>
            <td>{props.value}</td>
        </tr>
    )
}

export default CountryEmissionCell
