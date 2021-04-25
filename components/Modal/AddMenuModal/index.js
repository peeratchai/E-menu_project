import utilStyles from '../../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Image, Button, Modal, Form } from 'react-bootstrap'
import 'antd/dist/antd.css';
import React from 'react'
import useMediaQuery from "../../../utils/utils";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

export default function AddMenuModal(props) {
    const isMobileResolution = useMediaQuery(768)
    const [specialInstruction, setSpecialInstruction] = React.useState(null);
    const [count, setCount] = React.useState(1);
    const [total, setTotal] = React.useState(120);
    const [price, setPrice] = React.useState(120);

    const saveMenu = () => {
        console.log('specialInstruction ->', specialInstruction)
        console.log('count ->', count)
        props.onHide()
    }

    return (

        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {
                !isMobileResolution ? (
                    //PC Version
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ fontSize: "1.3rem" }}> ยำรวมมิตร</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row>
                                    <Col xs={12} md={3}>
                                        <Image src='/images/food4.jpg' />
                                    </Col>
                                    <Col xs={6} md={9}>
                                        <Row style={{ margin: "10px -15px" }}>
                                            <Col>
                                                Detail : ยำรวมมิตร
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <span>
                                                    จำนวน : &nbsp;
                                                </span>
                                                <Button className={utilStyles.btn} onClick={() => { count > 1 ? (setCount((count - 1)), setTotal((total - price))) : null }} >
                                                    <RemoveIcon />
                                                </Button>
                                                <span style={{ margin: "0 15px" }}>
                                                    {count}
                                                </span>
                                                <Button className={utilStyles.btn} onClick={() => { setCount(count + 1), setTotal((total + price)) }} >
                                                    <AddIcon />
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row style={{ marginTop: "15px" }}>
                                            <Col>
                                                รวม : {total}
                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>
                                <Form style={{ marginTop: "15px" }}>
                                    <Form.Group>
                                        <Form.Label>Special instruction</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={specialInstruction}
                                            onChange={e => setSpecialInstruction(e.target.value)}
                                        />
                                    </Form.Group>
                                </Form>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => { saveMenu() }}>
                                Submit
                </Button>
                            <Button onClick={props.onHide}>Close</Button>
                        </Modal.Footer>
                    </>
                ) : (
                    //Mobile Version
                    <>
                        <Modal.Header closeButton className={utilStyles.fontMobile}>
                            <Modal.Title style={{ fontSize: "1.3rem" }}> ยำรวมมิตร</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row>
                                    <Col xs={12} md={3}>
                                        <Image src='/images/food4.jpg' />
                                    </Col>
                                    <Col xs={12} md={9} style={{ marginTop: "15px" }}>
                                        <Row style={{ marginTop: "15px" }}>
                                            <Col>
                                                Detail : ยำรวมมิตร
                                                </Col>
                                        </Row>
                                        <Row style={{ marginTop: "15px" }}>
                                            <Col>
                                                <span>
                                                    จำนวน : &nbsp;
                                                </span>
                                                <Button className={utilStyles.btnMobile} onClick={() => { count > 1 ? (setCount((count - 1)), setTotal((total - price))) : null }} >
                                                    <RemoveIcon />
                                                </Button>
                                                <span style={{ margin: "0 15px" }}>
                                                    {count}
                                                </span>
                                                <Button className={utilStyles.btnMobile} onClick={() => { setCount(count + 1), setTotal((total + price)) }} >
                                                    <AddIcon />
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row style={{ marginTop: "15px" }}>
                                            <Col>
                                                รวม : {total}
                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>
                                <Form style={{ marginTop: "15px" }}>
                                    <Form.Group>
                                        <Form.Label>Special instruction</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={specialInstruction}
                                            onChange={e => setSpecialInstruction(e.target.value)}
                                        />
                                    </Form.Group>
                                </Form>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => { saveMenu() }}>
                                Submit
                                </Button>
                            <Button onClick={props.onHide}>Close</Button>
                        </Modal.Footer>
                    </>
                )
            }
        </Modal >
    );
}