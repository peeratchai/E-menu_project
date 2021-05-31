
import React from 'react'
import { Button, Modal, Container } from 'react-bootstrap'
import QRCode from 'qrcode.react';

export default function ViewTableQRCode(props) {
    const { table_selected, restaurant_name, restaurant_id } = props
    console.log('table_selected', table_selected)
    const { onHide } = props

    const downloadQR = () => {
        const canvas = document.getElementById("qrCodeEl");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `QRCode-${table_selected.name}.png`;
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
                    New Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <div>
                        <QRCode
                            id="qrCodeEl"
                            value={process.env.URL + "/menuFeeding/restaurantList/" + restaurant_name + "?restaurantId=" + restaurant_id + "&tableId=" + table_selected.id}
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
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>

        </Modal >
    );
}