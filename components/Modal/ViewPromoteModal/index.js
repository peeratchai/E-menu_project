import React from 'react'
import { Form, Modal, Container, Row, Col, Button } from 'react-bootstrap'
import { Upload } from 'antd'
import utilStyles from '../../../styles/utils.module.css'

export default function ViewPromoteModal(props) {

    const { promotion } = props

    return (

        <Modal
            {...props}
            dialogClassName="menuModal-70w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "1.3rem" }}>
                    <b>View Promotion Details</b>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col sm={6}>
                            <Row>
                                <Col>
                                    <img src={promotion.image_url} alt="avatar" style={{ width: '100%', height: '16rem', border: "1px solid #555", borderRadius: "5px" }} />
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={6}>
                            <Form>
                                <Form.Group controlId="Promoted_contents">
                                    <Form.Label className={utilStyles.cardTitle}>Promoted contents</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        value={promotion.promotedContent}
                                        readOnly
                                    />
                                </Form.Group>

                                <Form.Group controlId="banner_text">
                                    <Form.Label >Banner Text</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        value={promotion.bannerText}
                                        readOnly
                                    />
                                </Form.Group>
                            </Form>

                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button className="Buttom_Close" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal >
    );
}
