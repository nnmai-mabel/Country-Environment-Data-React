const DataStationDetailCell = (props) => {
    return (
        <tr>
            <td>{props.year}</td>
            <td>{props.stationType}</td>
            <td>{props.stationNumber}</td>
        </tr>
    )
}

export default DataStationDetailCell

