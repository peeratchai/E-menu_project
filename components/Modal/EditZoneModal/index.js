import React, { useEffect } from 'react'
import { Form, Button, Modal, Container } from 'react-bootstrap'


export default function EditZoneModal(props) {
    const { zone, onHide, edit_zone = '' } = props
    const [zoneName, setZoneName] = React.useState('');

    useEffect(() => {
        if (zone !== undefined) {
            setZoneName(zone.name)
        }
    }, [props])

    const editZone = () => {
        console.log('zoneName ->', zoneName)
        let editedZone = { ...zone }
        editedZone.name = zoneName
        setZoneName("")
        edit_zone(editedZone)
        onHide()
    }
    return (

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}>
                    New Zone
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form>
                        <Form.Group controlId="zoneName">
                            <Form.Control
                                type="text"
                                placeholder="Enter Zone Name"
                                value={zoneName}
                                onChange={e => setZoneName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => editZone()}>
                    Save
                </Button>
                <Button className="Buttom_Close" onClick={props.onHide}>Close</Button>
            </Modal.Footer>

        </Modal >
    );
}