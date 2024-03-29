import { Button, Modal, Container } from 'react-bootstrap'
import 'antd/dist/antd.css';
import React, { useEffect } from 'react'
import Maps from '../../Maps'


export default function LocationModal(props) {

    let { restaurant_location } = props
    const [markerPosition, setMarkerPosition] = React.useState({
        lat: 13.7320194,
        lng: 100.5745218
    })
    const [restaurantLocation, setRestaurantLocation] = React.useState({
        lat: 13.7320194,
        lng: 100.5745218
    })
    useEffect(() => {
        if (restaurant_location !== '') {
            changeFormatLocation()
        }
    }, [props])

    const changeFormatLocation = () => {
        try {
            let splitLocation = restaurant_location.split(' ');
            let lat = splitLocation[0].split('(')
            lat = lat[1]
            let lng = splitLocation[1].split(')')
            lng = lng[0]

            if (isNaN(parseFloat(lat))) {
                lat = 0
            } else {
                lat = parseFloat(lat)
            }
            if (isNaN(parseFloat(lng))) {
                lng = 0
            } else {
                lng = parseFloat(lng)
            }
            setRestaurantLocation({
                lat: lat,
                lng: lng
            })
        } catch (error) {
            console.log('error', error)
        }

    }

    return (

        <Modal
            {...props}
            dialogClassName="menuModal-70w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}>
                    Location
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <div style={{ marginBottom: "50px" }}>
                        <Maps
                            google={props.google}
                            center={{ lat: restaurantLocation.lat, lng: restaurantLocation.lng }}
                            height='500px'
                            zoom={15}
                            on_select_location={(markerPosition) => setMarkerPosition(markerPosition)}
                        />
                    </div>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => props.on_select_location(markerPosition)}>Save</Button>
                <Button className="Buttom_Close" onClick={props.onHide}>Close</Button>
            </Modal.Footer>

        </Modal >
    )

}