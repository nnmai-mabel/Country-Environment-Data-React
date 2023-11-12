//props contain year, itemName, value
const CountryEmissionCell = (props) => {
    return (
        <tr>
            <td>{props.year}</td>
            <td>{props.itemName}</td>
            <td>{Number(props.value).toFixed(2)}</td>
        </tr>
    )
}

export default CountryEmissionCell
