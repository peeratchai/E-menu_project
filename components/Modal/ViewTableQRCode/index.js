
import React, { useEffect } from 'react'
import { Button, Modal, Container } from 'react-bootstrap'
import QRCode from 'qrcode.react';

export default function ViewTableQRCode(props) {
    const { table_selected, restaurant_name, restaurant_id } = props
    const { onHide } = props

    const [restaurantName, setRestaurantName] = React.useState()
    const [tableName, setTableName] = React.useState()
    useEffect(() => {
        if (restaurant_name && table_selected) {
            let restaurantName = restaurant_name.split(" ").join("%20")
            let tableName = table_selected.name.split(" ").join("%20")
            console.log(process.env.URL + "/menuFeeding/restaurantList/" + restaurantName + "?restaurantId=" + restaurant_id + "&tableId=" + table_selected.id + "&tableName=" + tableName)
            setRestaurantName(restaurantName)
            setTableName(tableName)
        }
    }, [restaurant_name, table_selected])

    const downloadQR = () => {
        const canvas = document.getElementById("qrCodeEl");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `QRCode-${restaurant_name + ' - ' + table_selected.name}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}>
                    View QR Code
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <div style={{ textAlign: "center" }}>
                        <QRCode
                            id="qrCodeEl"
                            value={process.env.URL + "/menuFeeding/restaurantList/" + restaurantName + "?restaurantId=" + restaurant_id + "&tableId=" + table_selected.id + "&tableName=" + tableName}
                            size={290}
                            level={"H"}
                            includeMargin={true}
                        />
                        <br />
                        <Button onClick={downloadQR}> Download QR </Button>
                    </div>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button className="Buttom_Close" onClick={onHide}>Close</Button>
            </Modal.Footer>

        </Modal >
    );
}