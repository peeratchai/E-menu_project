import React, { useEffect } from 'react'
import { Form, Button, Modal, Container, Row, Col } from 'react-bootstrap'
import { Select, message } from 'antd'

export default function ViewContactUsMessageModal(props) {
    const { onHide, message_selected } = props
    const [contactUsForm, setContactUsForm] = React.useState({
        "name": '',
        "email": '',
        "phone": '',
        "subject": '',
        "message": ''
    });

    const [numOfMessage, setNumOfMessage] = React.useState('')

    useEffect(() => {
        if (message_selected) {
            setContactUsForm({
                "name": message_selected.name,
                "email": message_selected.email,
                "phone": message_selected.phone,
                "subject": message_selected.subject,
                "message": message_selected.message
            })

            setNumOfMessage(message_selected.No)
        }
    }, [message_selected])

    return (

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}>
                    No. {numOfMessage}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form style={{ padding: "10px 30px 40px 30px" }}>
                        <Row>
                            <Col xs={12} md={6}>
                                <Form.Group controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Your Name"
                                        value={contactUsForm.name}
                                        readOnly
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Email"
                                        value={contactUsForm.email}
                                        readOnly
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={6}>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Subject"
                                        value={contactUsForm.subject}
                                        readOnly
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group controlId="formPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Phone"
                                        value={contactUsForm.phone}
                                        readOnly
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="formMessage">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={contactUsForm.message}
                                        readOnly
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button className="Buttom_Close" onClick={onHide}>Close</Button>
            </Modal.Footer>

        </Modal >
    );
}