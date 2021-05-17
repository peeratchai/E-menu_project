import utilStyles from '../../../styles/utils.module.css'
import Container from 'react-bootstrap/Container'
import { Row, Col, Image, Button, Modal, Form } from 'react-bootstrap'
import 'antd/dist/antd.css';
import React, { useEffect } from 'react'
import useMediaQuery from "../../../utils/utils";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

export default function OrderMenuModal(props) {

    const isMobileResolution = useMediaQuery(768)
    const [specialInstruction, setSpecialInstruction] = React.useState(null);
    const [count, setCount] = React.useState(1);
    const [total, setTotal] = React.useState(100);
    const [menuDetail, setMenuDetail] = React.useState({
        name: "",
        price: 0,
        image_url: "",
        description: ""
    })

    useEffect(() => {
        if (props.menu_detail !== undefined) {
            setMenuDetail(props.menu_detail)
            setTotal(props.menu_detail.price)
            console.log(menuDetail)
        }
    }, [props])

    const saveMenu = () => {
        let basket = window.localStorage.getItem('basket');
        let restaurantId = props.restaurant_id
        let order = {
            ...menuDetail,
            specialInstruction: specialInstruction,
            count: count,
            total: total
        }
        if (basket === undefined || basket === null) {
            let key = order.name
            let menu = { 'restaurantId': restaurantId, 'order': [order] }
            window.localStorage.setItem('basket', JSON.stringify(menu));
        } else {
            basket = JSON.parse(basket)
            let key = order.name
            let oldOrder = basket.order
            basket = { 'restaurantId': restaurantId, 'order': [...oldOrder, order] }
            window.localStorage.setItem('basket', JSON.stringify(basket));
        }
        console.log('specialInstruction ->', specialInstruction)
        console.log('count ->', count)
        setCount(1)
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
                            <Modal.Title style={{ fontSize: "1.3rem" }}> {menuDetail.name}</Modal.Title>
                            {/* <Modal.Title style={{ fontSize: "1.3rem" }}> name</Modal.Title> */}

                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row>
                                    <Col xs={12} md={3}>
                                        <Image src={menuDetail.image_url} />
                                    </Col>
                                    <Col xs={6} md={9}>
                                        <Row style={{ margin: "10px -15px" }}>
                                            <Col>
                                                Detail : {menuDetail.description}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <span>
                                                    จำนวน : &nbsp;
                                                </span>
                                                <Button className={utilStyles.btn} onClick={() => { count > 1 ? (setCount((count - 1)), setTotal((total - menuDetail.price))) : null }} >
                                                    <RemoveIcon />
                                                </Button>
                                                <span style={{ margin: "0 15px" }}>
                                                    {count}
                                                </span>
                                                <Button className={utilStyles.btn} onClick={() => { setCount(count + 1), setTotal((total + menuDetail.price)) }} >
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
                            <Modal.Title style={{ fontSize: "1.3rem" }}> {menuDetail.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Row>
                                    <Col xs={12} md={3}>
                                        <Image src={menuDetail.image_url} />
                                    </Col>
                                    <Col xs={12} md={9} style={{ marginTop: "15px" }}>
                                        <Row style={{ marginTop: "15px" }}>
                                            <Col>
                                                Detail : {menuDetail.description}
                                            </Col>
                                        </Row>
                                        <Row style={{ marginTop: "15px" }}>
                                            <Col>
                                                <span>
                                                    จำนวน : &nbsp;
                                                </span>
                                                <Button className={utilStyles.btnMobile} onClick={() => { count > 1 ? (setCount((count - 1)), setTotal((total - menuDetail.price))) : null }} >
                                                    <RemoveIcon />
                                                </Button>
                                                <span style={{ margin: "0 15px" }}>
                                                    {count}
                                                </span>
                                                <Button className={utilStyles.btnMobile} onClick={() => { setCount(count + 1), setTotal((total + menuDetail.price)) }} >
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
                            <Button onClick={() => (setCount(1), props.onHide)}>Close</Button>
                        </Modal.Footer>
                    </>
                )
            }
        </Modal >
    );
}