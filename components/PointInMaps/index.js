
import LocationOnIcon from '@material-ui/icons/LocationOn';

const PointInMaps = ({ name }) => {

    return (
        <div style={{ width: "80px" }}>
            <div style={{ fontWeight: "bold" }}>{name}</div>
            <LocationOnIcon style={{ color: "red" }} />
        </div>
    )
}

export default PointInMaps